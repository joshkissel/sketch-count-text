function count(context) {

var doc = context.document

	var app = NSApplication.sharedApplication(),
		selected = context.selection.firstObject(),
		textAsLayer = selected.stringValue(),
		layerToString = String(textAsLayer),
		characters = 0,
		words = 0,
		whitespace = 0,
		paragraphs = 0,
		range;
		counted;


	if (context.selection.length == 0 || context.selection.length > 1)) {
		doc.showMessage("You must select one, and only one, layer.")
		return;
	}


	if (!selected || selected.class() != "MSTextLayer") {
		doc.showMessage("You must select a text layer!");
		return;

		} else if (selected.isEditingText()) {

			//Creates an NSRange of the higlighted text
			var partialSelectedPosition = selected.editingDelegate().textView().selectedRange();
			//gets location value from NSRange Location, location = x characters in
			var locationSelection = partialSelectedPosition["location"];
			//gets location value from NSRange Location, x characters forward from location
			var lengthSelection = partialSelectedPosition["length"];
			// Extracts highlighted text based on given selected NSRange
			var partialSelectedTextToString = selected.stringValue().substr(locationSelection, lengthSelection);

			characters = partialSelectedTextToString.length;
			words = partialSelectedTextToString.trim().split(" ").length;
			whitespace = partialSelectedTextToString.trim().split(' ').length - 1;
			paragraphs = partialSelectedTextToString.trim().split('\n').length;
		} else {
			characters = layerToString.length;
			words = layerToString.split(' ').length;
			whitespace = layerToString.split(' ').length - 1;
			paragraphs = layerToString.split('\n').length;
	}


	var counted = "Characters: " + characters
	+ "\n" +
	"Words: " + (words)
	+ "\n" +
	"Whitespace: " + (whitespace)
	+ "\n" +
	"Characters excluding spaces: " + (characters - whitespace)
	+ "\n" +
	"Paragraphs: " + (paragraphs)

	app.displayDialog_withTitle(counted, "Count");

}
