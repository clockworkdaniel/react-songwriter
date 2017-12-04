export default function dictateCaret(line, section, start){
	this.setState({focus : {
		line : line, section : section
	}});
	if (start !== undefined) {
		window.setTimeout(function(){ document.activeElement.setSelectionRange(start, start);}, 0);
	}
	
}