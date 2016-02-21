function submit() {
	draw_graph();
}

function draw_graph() {
	var directed = $("#directed").prop('checked');
	var ignore = $("#ignore").prop('checked')

	var data = $("#data").val();
	data = data.split('\n');
	if (ignore && data.length >= 1) {
		data[0] = "";
	}
	for (var i in data) {
		data[i] = data[i].trim().split(/ +/);
		if (data[i].length >= 2) {
			data[i][0] = parseInt(data[i][0]);
			data[i][1] = parseInt(data[i][1]);
		}
	}

	//create nodes
	var nodes_set = new Set();
	for (var i in data) {
		if (data[i].length < 2) continue;
		nodes_set.add(data[i][0]);
		nodes_set.add(data[i][1]);
	}
	var nodes = [];
	for (var node of nodes_set) {
		nodes.push({id: node, label: node});
	}

	// create edges
	var edges = [];
	for (var i in data) {
		if (data[i].length < 2) continue;
		var edge = {from: data[i][0], to: data[i][1]};
		if (data[i].length >= 3) {
			edge.label = data[i][2];
		}
		if (directed) {
			edge.arrows = 'to';
		}
		edges.push(edge);
	}

	// create a network
	var container = document.getElementById('graph');
	var data = {
		nodes: new vis.DataSet(nodes),
		edges: new vis.DataSet(edges)
	};
	var options = {};
	var network = new vis.Network(container, data, options);
}

$(document).ready(function() {
	$("#data").keydown(function(e) {
		if (e.ctrlKey && e.keyCode == 13) {
			submit();
		}
	});
});
