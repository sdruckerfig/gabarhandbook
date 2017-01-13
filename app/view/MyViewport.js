/*
 * File: app/view/MyViewport.js
 *
 * This file was generated by Sencha Architect version 4.1.1.
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

Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
        'MyApp.view.MyViewportViewModel',
        'MyApp.view.MyViewportViewController',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.panel.Tool',
        'Ext.XTemplate',
        'Ext.Img',
        'Ext.form.field.Text'
    ],

    controller: 'myviewport',
    viewModel: {
        type: 'myviewport'
    },
    height: 250,
    html: '<',
    width: 400,
    layout: 'border',

    items: [
        {
            xtype: 'treepanel',
            region: 'center',
            split: true,
            reference: 'mytree',
            flex: 2,
            collapsible: false,
            title: 'Table of Contents',
            rootVisible: false,
            bind: {
                store: '{TableOfContents}'
            },
            tools: [
                {
                    xtype: 'tool',
                    callback: 'onExpandAll',
                    tooltip: 'Expand All',
                    type: 'expand'
                },
                {
                    xtype: 'tool',
                    callback: 'onCollapseAll',
                    tooltip: 'Collapse All',
                    type: 'collapse'
                },
                {
                    xtype: 'tool',
                    tooltip: 'Help',
                    type: 'help'
                }
            ],
            listeners: {
                checkchange: 'onTreepanelCheckChange',
                select: 'onTreepanelSelect'
            }
        },
        {
            xtype: 'panel',
            region: 'east',
            split: true,
            reference: 'contentPnl',
            flex: 3,
            scrollable: true,
            tpl: [
                '<tpl for=".">',
                '    <h{depth}>{title}</h{depth}>',
                '    {content}',
                '</tpl>'
            ],
            width: 150,
            bodyPadding: 10,
            collapsible: true,
            title: 'Content',
            tools: [
                {
                    xtype: 'tool',
                    callback: function(owner, tool, event) {
                        owner.print();
                    },
                    type: 'print'
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'north',
            height: 60,
            margin: 0,
            layout: 'hbox',
            bodyPadding: 0,
            header: false,
            title: 'My Panel',
            items: [
                {
                    xtype: 'image',
                    flex: 1,
                    margin: 0,
                    width: 233,
                    src: 'resources/images/gabar-logo.gif'
                },
                {
                    xtype: 'component',
                    flex: 1,
                    html: '<div style="font-weight: bold; padding-top: 5px; text-align: center">Bar Rules Handbook</div>',
                    margin: '20 0 0 0'
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    margin: '15 5 0 0',
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
                            buffer: 250
                        }
                    }
                }
            ]
        }
    ]

});