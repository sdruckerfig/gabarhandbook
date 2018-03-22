/*
 * File: app/view/handbook/header/Header.js
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

Ext.define('MyApp.view.handbook.header.Header', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.navigationheader',

    requires: [
        'MyApp.view.handbook.header.HeaderViewModel',
        'MyApp.view.handbook.header.HeaderViewController',
        'Ext.form.field.Text',
        'Ext.XTemplate',
        'Ext.button.Button'
    ],

    controller: 'handbook.header.header',
    viewModel: {
        type: 'handbook.header.header'
    },
    height: 89,
    margin: 0,
    bodyCls: 'sbgbackground',
    bodyPadding: 5,
    header: false,
    title: 'My Panel',

    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items: [
        {
            xtype: 'component',
            flex: 2,
            html: '<div style="font-weight: bold; font-size: 22px; color: white;">Bar Rules Handbook</div>'
        },
        {
            xtype: 'textfield',
            flex: 1,
            reference: 'searchfield',
            cls: 'searchfield',
            margin: '0 5 0 0',
            style: {
                'border-radius': '5px'
            },
            fieldLabel: '',
            labelAlign: 'top',
            emptyText: 'Search',
            bind: {
                value: '{searchText}'
            },
            listeners: {
                change: {
                    fn: 'onSearchFieldChange',
                    buffer: 450
                }
            }
        },
        {
            xtype: 'button',
            handler: 'onClearSearch',
            text: 'Clear'
        }
    ]

});