const express = require('express');

const app = express();

app.get('/mean', function(req, res) {
    console.log("this is the mean route");
    let nums = req.query.nums;

    if (!nums) {
        return res.status(400).send("nums are required");
    }

    const numsArr = nums.split(',').map(Number);

    for (let num of numsArr) {
        if (isNaN(num)) {
            return res.status(400).send(`${num} is not a number`);
        }
    }

    const mean = calculateMean(numsArr);

    res.json({
        operation: "mean",
        value: mean
    });

    function calculateMean(nums) {
        const sum = nums.reduce((acc, num) => acc + num, 0);
        return sum / nums.length;
    }
});

app.get('/median', function(req, res) {
    console.log("this is the median route");
    let nums = req.query.nums;

    if (!nums) {
        return res.status(400).send("nums are required");
    }

    const numsArr = nums.split(',').map(Number);

    for (let num of numsArr) {
        if (isNaN(num)) {
            return res.status(400).send(`${num} is not a number`);
        }
    }

    const median = calculateMedian(numsArr);

    res.json({
        operation: "median",
        value: median
    });

    function calculateMedian(nums) {
        nums.sort((a, b) => a - b);

        const middle = Math.floor(nums.length / 2);

        if (nums.length % 2 === 1) {
            return nums[middle];
        } else {
            return (nums[middle - 1] + nums[middle]) / 2;
        }
    }
});

app.get('/mode', function(req, res) {
    console.log("this is the mode route");
    let nums = req.query.nums;

    if (!nums) {
        return res.status(400).send("nums are required");
    }

    const numsArr = nums.split(',').map(Number); 

    for (let num of numsArr) {
        if (isNaN(num)) {
            return res.status(400).send(`${num} is not a number`);
        }
    }

    const mode = calculateMode(numsArr);

    res.json({
        operation: "mode",
        value: mode
    });

    function calculateMode(nums) {
        const numFrequency = {};

        for (let num of nums) {
            if (num in numFrequency) {
                numFrequency[num]++;
            } else {
                numFrequency[num] = 1;
            }
        }

        let maxFrequency = 0;
        let mode = [];

        for (let num in numFrequency) {
            if (numFrequency[num] > maxFrequency) {
                maxFrequency = numFrequency[num];
                mode = [num];
            } else if (numFrequency[num] === maxFrequency) {
                mode.push(num);
            }
        }

        if (mode.length === nums.length) {
            return "No mode";
        }

        return mode.join(', ');
    }
});

app.get('/all', function(req, res) {
    console.log("this is the all route");
    let nums = req.query.nums;

    if (!nums) {
        return res.status(400).send("nums are required");
    }

    const numsArr = nums.split(',').map(Number); 

    for (let num of numsArr) {
        if (isNaN(num)) {
            return res.status(400).send(`${num} is not a number`);
        }
    }

    const mean = calculateMean(numsArr);
    const median = calculateMedian(numsArr);
    const mode = calculateMode(numsArr);

    res.json({
        operation: "all",
        mean: mean,
        median: median,
        mode: mode
    });

    function calculateMean(nums) {
        const sum = nums.reduce((acc, num) => acc + num, 0);
        return sum / nums.length;
    }

    function calculateMedian(nums) {
        nums.sort((a, b) => a - b);

        const middle = Math.floor(nums.length / 2);

        if (nums.length % 2 === 1) {
            return nums[middle];
        } else {
            return (nums[middle - 1] + nums[middle]) / 2;
        }
    }

    function calculateMode(nums) {
        const numFrequency = {};

        for (let num of nums) {
            if (num in numFrequency) {
                numFrequency[num]++;
            } else {
                numFrequency[num] = 1;
            }
        }

        let maxFrequency = 0;
        let mode = [];

        for (let num in numFrequency) {
            if (numFrequency[num] > maxFrequency) {
                maxFrequency = numFrequency[num];
                mode = [num];
            } else if (numFrequency[num] === maxFrequency) {
                mode.push(num);
            }
        }

        if (mode.length === nums.length) {
            return "No mode";
        }

        return mode.join(', ');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
