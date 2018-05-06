Ext.define('MyApp.view.override.Panel', {
    override: 'Ext.panel.Panel',

    print: function(pnl) {

    
        if (!pnl) {
            pnl = this;
        }

        // instantiate hidden iframe

        var iFrameId = "printerFrame";
        var printFrame = Ext.get(iFrameId);

        if (printFrame == null) {
            printFrame = Ext.getBody().appendChild({
                id: iFrameId,
                tag: 'iframe',
                cls: 'x-hidden',
                style: {
                    display: "none"
                }
            });
        }

        var cw = printFrame.dom.contentWindow;

        // instantiate application stylesheets in the hidden iframe

        var stylesheets = "";
        /*
        for (var i = 0; i < document.styleSheets.length; i++) {
            stylesheets += Ext.String.format('<link rel="stylesheet" href="{0}" />', document.styleSheets[i].href);
        }
        */

        // various style overrides
        stylesheets += ''.concat(
            "<style>",
          //   ".x-panel-body {overflow: visible !important;}",
            // experimental - page break after embedded panels
            // .x-panel {page-break-after: always; margin-top: 10px}",

            '.handbookNewBodyStyle ol {list-style-type: none !important; margin: 0 !important;}',
            '.handbookNewBodyStyle ol li:before  { content: "(" counter(section, lower-alpha) ") "; letter-spacing: 1px; }',
            '.handbookNewBodyStyle ol li { counter-increment: section; }',
            '.handbookNewBodyStyle ol ol {list-style-type: none !important;}',
            '.handbookNewBodyStyle ol ol li:before { content: "(" counter(section, decimal) ") "; }',
            '.handbookNewBodyStyle ol ol li:first-of-type { counter-reset: section; }',
            '.handbookNewBodyStyle ol ol ol { list-style-type: none !important; }',
            '.handbookNewBodyStyle  ol ol ol li:before { content: "(" counter(section, lower-roman) ") "; }',
            '.handbookNewBodyStyle  ol ol ol ol { list-style-type: none !important;}',
            '.handbookNewBodyStyle ol ol ol ol li:before { content: "(" counter(section, upper-alpha) ") ";}',
            "</style>"
        );

        // get the contents of the panel and remove hardcoded overflow properties
        var markup = pnl.getEl().down('.x-autocontainer-innerCt').dom.innerHTML;
       
        while (markup.indexOf('overflow: auto;') >= 0) {
            markup = markup.replace('overflow: auto;', '');
        }

        var str = Ext.String.format('<html><head><title>State Bar Handbook</title>{0}</head><body><img src="resources/images/gabar-logo.gif">{1}</body></html>', stylesheets, markup);

        // output to the iframe
        cw.document.open();
        cw.document.write(str);
        cw.document.close();

        // remove style attrib that has hardcoded height property
        // cw.document.getElementsByTagName('DIV')[0].removeAttribute('style');

        // print the iframe
        cw.print();

        // destroy the iframe
        Ext.fly(iFrameId).destroy();

    }
});