/*
 * File: app/view/MyViewportViewModel.js
 *
 * This file was generated by Sencha Architect version 4.2.2.
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

Ext.define('MyApp.view.MyViewportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myviewport',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax'
    ],

    data: {
        searchText: '',
        selectedNode: null,
        nextNode: null,
        prevNode: null,
        multiSelectMode: false
    },

    stores: {
        TableOfContents: {
            type: 'tree',
            autoLoad: true,
            filterer: 'bottomup',
            proxy: {
                type: 'ajax',
                url: 'https://dev.gabar.org/handbook/components/Handbook.cfc?method=get'
            },
            listeners: {
                beforeload: 'onTreeStoreBeforeLoad',
                load: 'onTreeStoreLoad'
            }
        }
    }

});