/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 4.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.2.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.2.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.Loader.setPath('Ext.ux.form.TinyMceTextArea','packages/TinyMCE/src/TinyMceTextArea.js');

Ext.application({
    models: [
        'Rule'
    ],
    views: [
        'MainContainer',
        'handbook.navigation.Navigation',
        'handbook.content.Content',
        'handbook.navigation.Buttonbar',
        'ContentEditor'
    ],
    controllers: [
        'Main'
    ],
    defaultToken: 'home',
    name: 'MyApp',

    requires: [
        'MyApp.view.override.Element'
    ],

    launch: function() {

        var mainContainer = Ext.create('MyApp.view.MainContainer', {
            renderTo: 'handbook'
        });
        Ext.get('handbook').on('resize', function(obj,e) {
           mainContainer.setWidth(e.width);
        },this,{buffer: 250});
    }

});
