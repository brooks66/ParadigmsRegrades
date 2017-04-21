function Item() { 
	this.addToDocument = function() {
		document.body.appendChild(this.item)
	}
};

function Label() {
	this.createLabel = function(text, id) {
		this.item = document.createElement("p");
		this.item.setAttribute("id", id);
		this.setText(text);
	}
	this.setText = function(text) {
		this.item.innerHTML = text;
	}
};

function Img() {
	this.createImg = function(imgLink, id) {
		this.item = document.createElement("img");
		this.item.setAttribute("id", id);
		this.item.setAttribute("src", imgLink)
	}
	this.changeImg = function(imgLink) {
		this.item.setAttribute("src", imgLink)
	}
};

function Button() { 
	this.createButton = function(text, id) {
		this.item = document.createElement("button");
		this.item.setAttribute("id", id);
		this.item.innerHTML = text;
	}
	this.addClickEventHandler = function(handler, args) {
		this.item.onmouseup = function(){handler(args)}
	}
};

function Div() {
	this.createDiv = function(id) {
		this.item = document.createElement("div");
		this.item.setAttribute("id", id)
	}
	this.addItemToTheDiv = function(item) {
		this.item.appendChild(item.item)
	}
};

function Dropdown() {
	this.createDropdown = function(dict, id, selected) {
		this.item = document.createElement("select");
		for (var x in dict) {
			var lx = dict[x];
			var option = document.createElement("option");
			option.text = lx;
			option.value = x;
			this.item.add(option);
			this.item.value = selected;
		}
	}
	this.getSelected = function() {
		return this.item[this.item.selectedIndex].value;
	}
};