function count(context) {

var doc = context.document

	var app = NSApplication.sharedApplication(),
		selected = context.selection.firstObject(),
		characters = 0,
		words = 0,
		whitespace = 0,
		paragraphs = 0,
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
			text = selected.stringValue().substr(locationSelection, lengthSelection);

			characters = text.length;
			words = text.trim().split(' ').length;
			whitespace = text.trim().split(' ').length - 1;
			paragraphs = text.trim().replace(/\n$/gm, '').split(/\n/).length;
		} else {
			textAsLayer = selected.stringValue(),
			layerToString = String(textAsLayer),

			characters = layerToString.length;
			words = layerToString.split(' ').length;
			whitespace = layerToString.split(' ').length - 1;
			paragraphs = layerToString.replace(/\n$/gm, '').split(/\n/).length;
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
