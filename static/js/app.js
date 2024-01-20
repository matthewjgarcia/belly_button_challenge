//set up the url first
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//step 1.
d3.json(url).then(function(data) {
    console.log(data);
});