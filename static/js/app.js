// Grab the url we want to use
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Load data and create both charts
d3.json(url).then(function(data) {
    // Extract initial data for the first sample
    let initialSample = data.samples[0];
    // Extract the initial metadata
    let initialMetaData = data.metadata[0];
    displayMetadata(initialMetaData);
    // First Create the initial horizontal bar chart
    // Use this concept for top 10
    let initialValues = initialSample.sample_values.slice(0, 10).reverse();
    let initialLabels = initialSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let initialHoverText = initialSample.otu_labels.slice(0, 10).reverse();

    let traceBar = {
        type: 'bar',
        orientation: 'h',
        x: initialValues,
        y: initialLabels,
        text: initialHoverText
    };

    let layoutBar = {
        title: 'Top 10 OTUs for Initial Sample',
        xaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bar', [traceBar], layoutBar);

    // Then Create the initial bubble chart
    // I liked the color scale for picnic so used that
    let traceBubble = {
        type: 'scatter',
        mode: 'markers',
        x: initialSample.otu_ids,
        y: initialSample.sample_values,
        marker: {
            size: initialSample.sample_values,
            color: initialSample.otu_ids,
            colorscale: 'Picnic'
        },
        text: initialSample.otu_labels
    };

    let layoutBubble = {
        title: 'Bubble Chart for Initial Sample',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bubble', [traceBubble], layoutBubble);

    // Next, create the dropdown menu
    let dropdown = d3.select("#selDataset");

    data.names.forEach((sampleID) => {
        dropdown.append("option").text(sampleID).property("value", sampleID);
    });

    // Event listener for dropdown change
    dropdown.on("change", updateCharts);
    
    // Initial chart update function
    function updateCharts() {
        let selectedSampleID = dropdown.property("value");
        let selectedSample = data.samples.find(sample => sample.id === selectedSampleID);
        let selectedMetaData = data.metadata.find(metadata => metadata.id === parseInt(selectedSampleID));
        
        // Display the metadata
        displayMetadata(selectedMetaData);
        
        // Update the horizontal bar chart with the selected sample data
        // top 10 for selected
        Plotly.update('bar', {
            x: [selectedSample.sample_values.slice(0, 10).reverse()],
            y: [selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse()],
            text: [selectedSample.otu_labels.slice(0, 10).reverse()]
        });

        // Update the bubble chart with the selected sample data
        Plotly.update('bubble', {
            x: [selectedSample.otu_ids],
            y: [selectedSample.sample_values],
            'marker.size': [selectedSample.sample_values],
            'marker.color': [selectedSample.otu_ids],
            text: [selectedSample.otu_labels]
        });
    }
    function displayMetadata(metadata) {
        let metadataContainer = d3.select("#sample-metadata");
        metadataContainer.html(""); // Clear previous content
    
        // Iterate over key value pairs and add them to the container
        Object.entries(metadata).forEach(([key, value]) => {
            metadataContainer.append("p").text(`${key}: ${value}`);
        });
    }

});
