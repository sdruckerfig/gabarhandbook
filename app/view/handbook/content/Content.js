/*
 * File: app/view/handbook/content/Content.js
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

Ext.define('MyApp.view.handbook.content.Content', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.displaycontent',

    requires: [
        'MyApp.view.handbook.content.ContentViewModel',
        'MyApp.view.handbook.content.ContentViewController',
        'Ext.panel.Tool',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox'
    ],

    controller: 'mypanel11',
    viewModel: {
        type: 'mypanel11'
    },
    reference: 'contentPnl',
    flex: 3,
    scrollable: true,
    tpl: [
        '<tpl for=".">',
        '    <h{depth}>{title}</h{depth}>',
        '    {content}',
        '</tpl>'
    ],
    ui: 'readabletext',
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
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            cls: 'warning',
            dock: 'top',
            bind: {
                hidden: '{multiSelectMode || !versionsAvailable}'
            },
            items: [
                {
                    xtype: 'tbtext',
                    html: 'Multiple Versions Available'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'combobox',
                    width: 150,
                    editable: false,
                    emptyText: 'Select Version',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    bind: {
                        value: '{selectedVersionId}',
                        store: '{ContentVersions}'
                    },
                    listeners: {
                        select: 'changeVersion'
                    }
                }
            ]
        }
    ]

});