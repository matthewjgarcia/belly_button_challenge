// Specify the URL of the JSON file
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Step 1: Load data and extract initial values
d3.json(url).then(function(data) {
    // Extract initial data for the first sample
    const initialSample = data.samples[0];
    const initialValues = initialSample.sample_values.slice(0, 10).reverse();
    const initialLabels = initialSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const initialHoverText = initialSample.otu_labels.slice(0, 10).reverse();

    // Step 2: Create the initial horizontal bar chart
    const trace = {
        type: 'bar',
        orientation: 'h',
        x: initialValues,
        y: initialLabels,
        text: initialHoverText
    };

    const layout = {
        title: 'Top 10 OTUs for Initial Sample',
        xaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bar', [trace], layout);

    // Step 3: Create the dropdown menu
    const dropdown = d3.select("#selDataset");

    data.names.forEach((sampleID) => {
        dropdown.append("option").text(sampleID).property("value", sampleID);
    });

    // Event listener for dropdown change
    dropdown.on("change", updateChart);
    
    // Initial chart update function
    function updateChart() {
        const selectedSampleID = dropdown.property("value");
        const selectedSample = data.samples.find(sample => sample.id === selectedSampleID);
        
        // Extract data for the selected sample
        const selectedValues = selectedSample.sample_values.slice(0, 10).reverse();
        const selectedLabels = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        const selectedHoverText = selectedSample.otu_labels.slice(0, 10).reverse();
        
        // Update the chart with the selected sample data
        Plotly.update('bar', {
            x: [selectedValues],
            y: [selectedLabels],
            text: [selectedHoverText]
        });
    }
});
