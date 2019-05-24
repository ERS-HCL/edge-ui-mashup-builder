import { Component, OnInit, destroyPlatform } from '@angular/core';
import 'hcl-ers-edge-responsive-table-master/src/core-grid-datatypes/core-grid-datatypes.js';
declare global {
  interface Window { Highcharts: any; }
  }
  
import Highcharts from 'highcharts/highstock';
window.Highcharts = Highcharts; //this line did the magic
import 'core-chart-datatypes/src/core-chart-datatypes/core-chart-datatypes.js';

declare var grapesjs: any; // Important!
import basicBlocksPlugin from 'grapesjs-blocks-basic';
import exportPlugin from 'grapesjs-plugin-export';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {
  public apirequest: any;
  public tableconfig: any;
  
  public chartconfig: {[k:string]:any}={
    bar:{"showTotal":false,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{ "series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true,"stacking":"normal"}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    column:{"showTotal":true,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{"series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true,"stacking":"normal"}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    pie:{"showTotal":false,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"type":"pie","events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{"series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"format": '<b>{point.name}</b>: {point.percentage:.1f} %',"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    donut:{"showTotal":false,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{"series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"format": '<b>{point.name}</b>: {point.percentage:.1f} %',"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true,"startAngle":0,"endAngle":360}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    line:{"showTotal":true,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{"series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    area:{"showTotal":true,"tooltipFormat":"NameAndValue","responsive":true,"uniqueId":"uniqueId","colors":["#DB8F25","#d4534c","#7ec6bb","#999","#5cdff4","#ffa519","#c42525","#19a7a7","#a6c96a"],"exporting":{"enabled":false},"chart":{"events":{"clickEventEnabled":false,"clickEventName":"chartClickEvent","clickEventUniqueId":"chart_1"},"height":"50%"},"title":{"text":"Parent App chart title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial, Helvetica, sans-serif"}},"subtitle":{"text":"Parent App chart subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"legend":{"align":"right","backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"verticalAlign":"middle","itemMarginTop":2,"itemMarginBottom":2,"itemStyle":{"color":"#666666","fontSize":"12px","fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif"},"data":{"enabled":false}},"tooltip":{"backgroundColor":"#FFFFFF","borderColor":"#CCCCCC","borderRadius":5,"borderWidth":1,"enabled":true,"followPointer":false,"style":{"color":"contrast","fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"plotOptions":{"series":{"pointPadding":0.4,"clickEventEnabled":false,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","dataLabels":{"enabled":false,"borderRadius":1,"style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"borderWidth":1,"borderColor":"#FFFFFF","showInLegend":true,"stacking":"percent"}},"xAxis":{"gridLineWidth":1,"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"xAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}},"scrollbar":{"enabled":true}},"yAxis":{"gridLineWidth":1,"stackLabels":{"enabled":false},"labels":{"enabled":true,"events":{"clickEventEnabled":false,"clickEventName":"yAxisLabelClickEvent","clickEventUniqueId":"chart_1"},"align":"center","style":{"fontSize":"11px","fontFamily":"Arial, Helvetica, sans-serif"}},"title":{"enabled":true,"align":"middle","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}},"targetBox":{"clickEventEnabled":true,"clickEventName":"seriesClickEvent","clickEventUniqueId":"chart_1","text":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"black"}},"aboveTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}},"belowTarget":{"style":{"font-size":"14px","font-family":"Arial, Helvetica, sans-serif","color":"#d3650a"}}}},
    grid:{"id":"materialsummary","theme":"blue","title":{"text":"Parent grid title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial,Helvetica,sans-serif"}},"subtitle":{"text":"Parent grid subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}}
  };
  public components=['chart','pie','donut','grid'];

  constructor() {
   
  }

  ngOnInit() {

    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      fromElement: true,
      // Size of the editor
      height: '300px',
      width: 'auto',
      storageManager: {
        type: null
      },
      commands:{
        defaults: [
          {
            id:'set-style',
            run: function(editor){
                editor.getWrapper().setStyle({'margin-left':'300px'});
            }
          }
        ]
      },
      panels: {
        defaults: []
      },

      plugins: [basicBlocksPlugin, exportPlugin],
      pluginsOpts: {
        [basicBlocksPlugin]: {
          blocks: ['column1'],
          flexGrid: 0,
          stylePrefix: 'gjs-',
          addBasicStyle: true,
          category: 'Basic',
          labelColumn1: '1 Column'
        },
        [exportPlugin]: {
          addExportBtn: true,
          btnLabel: 'Export to ZIP',
          filenamePfx: 'grapesjs_templateCode',
          root: {
            custom: {
              'custom.component.css' : ed => ed.getCss(),
              'custom.component.html': ed => ed.getWrapper().view.$el[0].innerHTML.replace(/"/g,"'").replace(/&quot;/g, "\""),
              'custom.component.ts': ed =>
                `import { Component } from '@angular/core';
                import { Renderer2, OnInit, Inject } from '@angular/core';
                import { DOCUMENT } from '@angular/platform-browser';
                @Component({
                  selector: 'custom-component',
                  templateUrl: './custom.component.html',
                  styleUrls: ['./custom.component.css']
                })
                export class CustomComponent implements OnInit {
                    constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
                }
                public ngOnInit() {
                      ${this.includeCustomScripts(ed)}
                  }
                }
                
                `
            }
            // css: {
            //   'style.css': ed => ed.getCss(),
            // },        
            // 'index.html': ed =>
            //   `<!doctype html>
            // <html lang="en">
            //   <head>
            //     <meta charset="utf-8">
            //     <link rel="stylesheet" href="./css/style.css">
            //     ${this.includeScripts(ed)}                
            //   </head>
            //   <body>${ed.getHtml()}</body>
            // <html>`,
          }
        }
      },
      blockManager: {
       // appendTo: '#blocks',
      },
      chartManager: {
        //appendTo: '#blocks',
      },
      traitManager:{
         // appendTo:"#blocks",
          textNoElement: 'Select an element before using Trait Manager',
          labelContainer: 'Settings',
      }
    });

    editor.runCommand('sw-visibility');
    editor.runCommand('open-blocks');
    editor.runCommand('set-style');
   
    let blockManager = editor.BlockManager;
    let chartManager = editor.BlockManager;
    let self=this;
    var domComps = editor.DomComponents;
    this.addType(this.components,domComps);

    editor.TraitManager.addType('heading', {
      getInputEl: function () {
        return self.setInputValue(this,'heading','text');
      }
    });

    editor.TraitManager.addType('subtitle', {
      getInputEl: function () {
        return self.setInputValue(this,'subtitle','text');
      }
    });

    editor.TraitManager.addType('fontFamily', {
      getInputEl: function () {
        return self.setInputValue(this,'fontFamily','text');
      }
    });

    editor.TraitManager.addType('api', {
      getInputEl: function () {
        return self.setInputValue(this,'api','text');
      }
    });

    editor.TraitManager.addType('legendAlign', {
      getInputEl: function () {
        return self.setSelectValue(this,'legendAlign',['right','left','center']);
      }
    });


    editor.TraitManager.addType('tooltipFormat', {
      getInputEl: function () {
        return self.setSelectValue(this,'tooltipFormat',['NameAndValue','Value']);
      }
    });

    editor.TraitManager.addType('barchartType', {
      getInputEl: function () {
        return self.setSelectValue(this,'barChartType',['Stacked','Basic']);
      }
    });

    editor.TraitManager.addType('donutType', {
      getInputEl: function () {
        return self.setSelectValue(this,'donutType',['Basic','Semi Circle']);
      }
    });

    editor.TraitManager.addType('theme', {
      getInputEl: function () {
        return self.setSelectValue(this,'theme',['blue','dark']);
      }
    });

    editor.on('block:drag:stop', (model) => {
      if(model){
      let comp=model.closest('div.row-cell') ? model.closest('div.row-cell') : model.closest('div.gjs-cell');
        if(comp != 0){
        comp.setStyle({width: '8%'});
        model.setStyle({padding:'10px'});
        model.setStyle({height:'250px'});
        }
      }
    }); 
      
      editor.Commands.add("tlb-delete", {
      run(ed) {
        let sel = ed.getSelected();
        if (!sel || !sel.get("removable")) {
          return;
        }
        ed.select(null);
        ed.trigger("component:preremove", sel);
        sel.destroy();
      }
    });
      
      editor.on("component:preremove", model => {
      if(model){
        let comp=model.closest('div.row-cell');
        if(comp != 0){
          comp.setStyle({width: '8%'});
        }
      }
    }); 

    editor.on('component:selected', () => {
      const openSmBtn = editor.Panels.getButton('basic-actions', 'trait');
      openSmBtn.set('active', 1);
    });

      chartManager.add('2ColumnGrid', {
        category: 'Basic',
        attributes: {class:'gjs-fonts gjs-f-b2'},
        label: '2 X 1',
        content: `<div class="column" data-gjs-custom-name="column"><div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row"><div class="row-cell" data-gjs-draggable=".row"></div><div class="row-cell" data-gjs-draggable=".row"></div></div>
        <style>
          .row {
            display: flex;
            justify-content: flex-start;
            align-items: stretch;
            flex-wrap: nowrap;
            padding: 10px;
            min-height: 75px;
          }
          .row-cell {
            flex-grow: 1;
            flex-basis: 100%;
            padding: 5px;
          }
        </style>
      `,
      });
      chartManager.add('3ColumnGrid', {
        category: 'Basic',
        attributes: {class:'gjs-fonts gjs-f-b3'},
        label: '3 x 1',
        content: `<div class="column" data-gjs-custom-name="column"><div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row"><div class="row-cell" data-gjs-draggable=".row"></div><div class="row-cell" data-gjs-draggable=".row"></div><div class="row-cell" data-gjs-draggable=".row"></div></div>
        <style>
        .row {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: nowrap;
        padding: 10px;
        min-height: 75px;
        }
        .row-cell {
        flex-grow: 1;
        flex-basis: 100%;
        padding: 5px;
        }
        </style>
        `,
        });  
    chartManager.add('multiColumnGrid', {
      category: 'Basic',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="70" viewBox="0 0 18 18"><path d="M3 2v13h13V2H4zm7 12H4v-5h5v5zm0-6H4V3h5v5zm5 6h-5v-5h5v5zm0-6h-5V3h5"/></svg></br><div class="gjs-block-label">2 X 2</div>',
      content: `<div class="column" data-gjs-custom-name="column"><div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row"><div class="row-cell" data-gjs-draggable=".row"></div><div class="row-cell" data-gjs-draggable=".row"></div></div><div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row"><div class="row-cell" data-gjs-draggable=".row"></div><div class="row-cell" data-gjs-draggable=".row"></div></div></div>
      <style>
        .row {
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          flex-wrap: nowrap;
          padding: 10px;
          min-height: 75px;
        }
        .row-cell {
          flex-grow: 1;
          flex-basis: 100%;
          padding: 5px;
        }
      </style>
    `,
    });
        
    /*chartManager.add('multiColumnGrid', {
      category: 'Basic',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="70" viewBox="0 0 18 18"><path d="M3 2v13h13V2H4zm7 12H4v-5h5v5zm0-6H4V3h5v5zm5 6h-5v-5h5v5zm0-6h-5V3h5"/></svg></br><div class="gjs-block-label">2 X 2</div>',
      content: {
        attributes: { 'id': 'multiColumn' },
        content:'<div class="gjs-row"><div data-gjs-type="default" data-highlightable="1" class="gjs-cell"></div><div data-gjs-type="default" data-highlightable="1" class="gjs-cell"></div></div><div class="gjs-row"><div data-gjs-type="default" data-highlightable="1" class="gjs-cell"></div><div data-gjs-type="default" data-highlightable="1" class="gjs-cell"></div></div>'
      }
      toAdd('column2') && bm.add('column2', {
        label: c.labelColumn2,
        attributes: {class:'gjs-fonts gjs-f-b2'},
        category: c.category,
        content: `<div ${attrsRow}>
            <div ${attrsCell}></div>
            <div ${attrsCell}></div>
          </div>
          ${ basicStyle ?
            `<style>
              ${styleRow}
              ${styleClm}
            </style>`
            : ''}`
      });
    });*/

    // 'my-first-block' is the ID of the block
    blockManager.add('grid', {
      category: 'Components',
      label: '<i class="fa fa-table awsimgsize" aria-hidden="true"></i></br><lable class="awslblsize">Table</label>',
      content: {
        // script: function () {
      //   var script = document.createElement('script');
      //   script.src = 'https://hclo365-my.sharepoint.com/personal/velmurugan_su_hcl_com/Documents/main.js?e=4%3a680718ec2de5496ca6ac9df8bccf13ae&at=9';
      //   document.body.appendChild(script);
      // },
        attributes: { 'id': 'gridTable', type:'grid','heading':'Parent grid title','subtitle':"Parent grid subtitle",'api':'https://my-json-server.typicode.com/VelmuruganHCL/gridDemo/db','fontFamily':'Arial, Helvetica, sans-serif','theme':'blue' },
        content: '<core-grid-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/VelmuruganHCL/gridDemo/db"}\' tableconfig=\'{"id":"materialsummary","theme":"blue","title":{"text":"Parent grid title","enabled":true,"align":"center","verticalAlign":"","style":{"fontSize":"18px","fontStyle":"normal","fontFamily":"Arial,Helvetica,sans-serif"}},"subtitle":{"text":"Parent grid subtitle","align":"center","verticalAlign":"","style":{"fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif"}}}\'></core-grid-datatypes>',
        type:'grid',
      }
    });


   chartManager.add('barchart', {
      category: 'Components',
      label: '<i class="fa fa-bar-chart awsimgsize"></i></br><lable class="awslblsize">Bar Chart</label>',
      content: {
        attributes: { 'id': 'barCharts','type':'bar', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','enableData':false,'barChartType':'Stacked'},
         content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.bar)+'\''+ 'charttype="bar"></core-chart-datatypes>',
        type:'chart'
      }
    });

    chartManager.add('columnchart', {
      category: 'Components',
      label: '<i class="fa fa-columns awsimgsize"></i></br><lable class="awslblsize">Column Chart</label>',
      content: {
        attributes: { 'id': 'columnCharts','type':'column', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','enableData':false,'barChartType':'Stacked'},
        content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.column)+'\''+ 'charttype="column"></core-chart-datatypes>',
        type:'chart'
      }
    });

    chartManager.add('piechart', {
      category: 'Components',
      label: '<i class="fa fa-pie-chart awsimgsize"></i></br><lable class="awslblsize">Pie Chart</label>',
      content: {
        attributes: { 'id': 'pieCharts','type':'pie', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','showTotal':false,'enableData':false  },
        content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.pie)+'\''+ 'charttype="pie"></core-chart-datatypes>',
        type:'pie'
      }
    });

    chartManager.add('donutchart', {
      category: 'Components',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"/></svg></br><lable class="awslblsize">Donut Chart</label>',
      content: {
        attributes: { 'id': 'donutCharts','type':'donut', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','showTotal':false ,'enableData':false,'donutType':'Basic' },
        content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.donut)+'\''+ 'charttype="donut"></core-chart-datatypes>',
        type:'donut'
      }
    });

    chartManager.add('linetchart', {
      category: 'Components',
      label: '<i class="fa fa-line-chart awsimgsize"></i></br><lable class="awslblsize">Line Chart</label>',
      content: {
        attributes: { 'id': 'lineCharts' ,'type':'line', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','enableData':false ,'barChartType':'Stacked'},
        content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.line)+'\''+ 'charttype="line"></core-chart-datatypes>',
        type:'chart'
      }
    });

    chartManager.add('areachart', {
      category: 'Components',
      label: '<i class="fa fa-area-chart awsimgsize"></i></br><lable class="awslblsize">Area Chart</label>',
      content: {
        attributes: { 'id': 'areaCharts' ,'type':'area', 'heading':'Parent App Chart Title','subtitle':"Parent app Chart subtitle",'api':'https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1','legendAlign':'right','tooltipEnabled':true ,'tooltipFormat':'NameAndValue','fontFamily':'Arial, Helvetica, sans-serif','enableData':false ,'barChartType':'Stacked'},
        content:'<core-chart-datatypes apirequest=\'{"handlerURL":"https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1"}\' chartconfig=\''+JSON.stringify(this.chartconfig.area)+'\''+ 'charttype="area"></core-chart-datatypes>',
        type:'chart'
      }
    });

    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });
    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id:'trait',
          className: 'fa fa-cog',
          command: 'open-tm',
          togglable: 1

        },
        {
          id: 'open-blocks',
          active:true,
          className: 'fa fa-th-large',
          command: 'open-blocks',
          togglable: 1,
          attributes: { title: 'Open Blocks' }
        },
        {
          id: 'export',
          className: 'btn-open-export',
          //label: 'Export',
          command: 'export-template',
          context: 'export-template' // For grouping context of buttons from the same panel
        }
     
      ]
    });
 
  }

    includeCustomScripts(ed){
      var temContent = ed.getHtml();
      var scriptToInclude = `let s = this._renderer2.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.7/custom-elements-es5-adapter.js';
      this._renderer2.appendChild(this._document.body, s);`;
      if (temContent.indexOf('core-grid-datatypes') > -1) {
        let arr=["https://hclo365-my.sharepoint.com/personal/velmurugan_su_hcl_com/Documents/main.js?e=4%3a680718ec2de5496ca6ac9df8bccf13ae&at=9"]
        for(let i=0;i<arr.length;i++){
          scriptToInclude +=`let s${i} = this._renderer2.createElement('script');
          s${i}.type = 'text/javascript';
          s${i}.src = '${arr[i]}';
          this._renderer2.appendChild(this._document.body, s${i});`
        }
      }
      if (temContent.indexOf('core-chart-datatypes') > -1) {
        let arr=["https://cdnjs.cloudflare.com/ajax/libs/highcharts/6.2.0/highcharts.js","https://hclo365-my.sharepoint.com/:u:/r/personal/velmurugan_su_hcl_com/Documents/main_chart.js?csf=1&e=txgNtu"]
        for(let i=0;i<arr.length;i++){
          scriptToInclude +=`let c${i} = this._renderer2.createElement('script');
          c${i}.type = 'text/javascript';
          c${i}.src = '${arr[i]}';
          this._renderer2.appendChild(this._document.body, c${i});`
        }
      }
        return scriptToInclude;
    }

    includeScripts(ed) {
      var temContent = ed.getHtml();
      var scriptToInclude = "";
      if (temContent.indexOf('gridTable') > -1) {
        scriptToInclude = scriptToInclude + '<script src="https://hclo365-my.sharepoint.com/personal/velmurugan_su_hcl_com/Documents/main.js?e=4%3a680718ec2de5496ca6ac9df8bccf13ae&at=9"/>\n' + '<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.7/custom-elements-es5-adapter.js"/>\n';
        
      }
      if (temContent.indexOf('testComp') > -1) {
        scriptToInclude = scriptToInclude + '<script src="test component"/>\n';
      }
      if (temContent.indexOf('inputComp') > -1) {
        scriptToInclude = scriptToInclude + '<script src="input component"/>\n';
      }
      if (temContent.indexOf('textComp') > -1) {
        scriptToInclude = scriptToInclude + '<script src="text component"/>\n';
      }
      if (temContent.indexOf('secComp') > -1) {
        scriptToInclude = scriptToInclude + '<script src="section component"/>\n';
      }

      return scriptToInclude;
    }

    setInputValue(scope,attr,type){
      if (!scope.inputEl) {
        let input = document.createElement('input');
        input.type=type;
        input.value = scope.target.get('attributes')[attr];
        scope.inputEl = input;
      }
      return scope.inputEl;
    }

    setSelectValue(scope,attr,options){

      if (!scope.inputEl) {
        var select = document.createElement('select');
        for(let i of options){
          let option=document.createElement('option');
          option.value=i;
          option.text=i;
          select.appendChild(option);
        }
        select.value = scope.target.get('attributes')[attr];
        scope.inputEl = select;
      }
      return scope.inputEl;
    }

    addType(components,domComps){
      for(let i=0;i<components.length;i++){
          this.addTraitType(components[i],domComps);
      }
    }
    addTraitType(component,domComps){
      let self=this;
      let dType = domComps.getType('default');
      let dModel = dType.model;
      let dView = dType.view;
      domComps.addType(component, {
        model: dModel.extend({
          init() {
            
            this.listenTo(this, 'change:heading', this.changeTitle);
            this.listenTo(this, 'change:subtitle', this.changeTitle);
            this.listenTo(this, 'change:api', this.changeTitle);
            this.listenTo(this, 'change:fontFamily', this.changeTitle);
            this.listenTo(this, 'change:legendAlign', this.changeTitle);
            this.listenTo(this, 'change:tooltipEnabled', this.changeTitle);
            this.listenTo(this, 'change:tooltipFormat', this.changeTitle);
            this.listenTo(this, 'change:barchartType', this.changeTitle);
            this.listenTo(this, 'change:donutType', this.changeTitle);
        //   this.listenTo(this, 'change:enableStack', this.changeTitle);
            this.listenTo(this, 'change:showTotal', this.changeTitle);  
            this.listenTo(this, 'change:enableData', this.changeTitle);
            this.listenTo(this, 'change:theme', this.changeTitle);

          },
          changeTitle() {
              self.chartconfig[this.attributes.attributes.type].title.text=this.get('heading') ? this.get('heading') : 'Parent App chart title';;
              self.chartconfig[this.attributes.attributes.type].subtitle.text=this.get('subtitle') ? this.get('subtitle') : 'Parent App chart subtitle';
              self.chartconfig[this.attributes.attributes.type].title.style.fontFamily=this.get('fontFamily') ? this.get('fontFamily') : 'Arial, Helvetica, sans-serif';
              self.chartconfig[this.attributes.attributes.type].subtitle.style.fontFamily=this.get('fontFamily') ? this.get('fontFamily') : 'Arial, Helvetica, sans-serif';

              if(component != 'grid'){
                self.chartconfig[this.attributes.attributes.type].legend.align=this.get('legendAlign') ? this.get('legendAlign') : 'right';
                self.chartconfig[this.attributes.attributes.type].tooltip.enabled=this.get('tooltipEnabled') ? (this.get('tooltipEnabled') == true ? false : true) : true;
                self.chartconfig[this.attributes.attributes.type].tooltipFormat=this.get('tooltipFormat') ? this.get('tooltipFormat') : 'NameAndValue';
                self.chartconfig[this.attributes.attributes.type].plotOptions.series.dataLabels.enabled=this.get('enableData') ? this.get('enableData') : false;
              }
              if(component == 'grid'){
                self.chartconfig[this.attributes.attributes.type].theme=this.get('theme') ? this.get('theme') : 'blue';
              }

              if(component == 'chart'){
                let obj=JSON.parse(JSON.stringify(self.chartconfig.bar.plotOptions.series));
              delete obj.stacking;
                self.chartconfig.bar.plotOptions.series.stacking='normal';
                self.chartconfig[this.attributes.attributes.type].plotOptions.series=this.get('barchartType') ? this.get('barchartType') == 'Stacked' ? self.chartconfig.bar.plotOptions.series : obj : 
                self.chartconfig.bar.plotOptions.series;
              }
              if(component == 'pie' || component == 'donut'){
                self.chartconfig[this.attributes.attributes.type].showTotal=this.get('showTotal') ? this.get('showTotal') : false;
              }
              if(component == 'donut'){
                self.chartconfig[this.attributes.attributes.type].plotOptions.series.startAngle=this.get('donutType') ? this.get('donutType') == 'Basic' ? 0 : -90 : 0;
                self.chartconfig[this.attributes.attributes.type].plotOptions.series.endAngle=this.get('donutType') ? this.get('donutType') == 'Basic' ? 360 : 90 : 360;
              }

              let cusElem;
              if(this.attributes.attributes.type == 'grid'){
                cusElem=document.createElement('core-grid-datatypes');
              }
              else{
                cusElem=document.createElement('core-chart-datatypes');
              }
              if(this.attributes.attributes.type != 'grid'){
                cusElem.setAttribute('charttype',this.attributes.attributes.type);  
                cusElem.setAttribute('chartconfig',JSON.stringify(self.chartconfig[this.attributes.attributes.type]));
                if(this.attributes.attributes.type == "pie" || this.attributes.attributes.type == "donut"){
                  cusElem.setAttribute('apirequest',JSON.stringify({"handlerURL":this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1"}));
                  this.attributes.attributes.api=this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/Ayshvarya/chartDemo/posts/1";
                }
                else{
                  cusElem.setAttribute('apirequest',JSON.stringify({"handlerURL":this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1"}));
                  this.attributes.attributes.api=this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/Ayshvarya/chartDemo/chart/1";

                }

              } 
              else{
                cusElem.setAttribute('tableconfig',JSON.stringify(self.chartconfig[this.attributes.attributes.type]));
                cusElem.setAttribute('apirequest',JSON.stringify({"handlerURL":this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/VelmuruganHCL/gridDemo/db"}));
                cusElem.setAttribute('apirequest',JSON.stringify({"handlerURL":this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/VelmuruganHCL/gridDemo/db"}));
                this.attributes.attributes.api=this.get('api') ? this.get('api') : "https://my-json-server.typicode.com/VelmuruganHCL/gridDemo/db";
              }     
              this.view.$el[0].innerHTML='';
              this.view.$el[0].appendChild(cusElem);
              this.attributes.attributes.heading=this.get('heading') ? this.get('heading') : 'Parent App chart title';;
              this.attributes.attributes.subtitle=this.get('subtitle') ? this.get('subtitle') : 'Parent App chart subtitle';
              this.attributes.attributes.fontFamily=this.get('fontFamily') ? this.get('fontFamily') : 'Arial, Helvetica, sans-serif';
              if(component != 'grid'){
                this.attributes.attributes.legendAlign=this.get('legendAlign') ? this.get('legendAlign') : 'right';
                this.attributes.attributes.tooltipEnabled=this.get('tooltipEnabled') ? (this.get('tooltipEnabled') == true ? false : true) : true;
                this.attributes.attributes.tooltipFormat=this.get('tooltipFormat') ? this.get('tooltipFormat') : 'NameAndValue';
                this.attributes.attributes.enableData=this.get('enableData') ? this.get('enableData') : false;
              }
           
              if(component == 'chart'){
                this.attributes.attributes.barChartType=this.get('barchartType') ? this.get('barchartType') :'Stacked';
              }
              if(component == 'grid'){
                this.attributes.attributes.theme=this.get('theme') ? this.get('theme') : 'blue';
              }
              if(component == 'pie' || component == 'donut'){
                this.attributes.attributes.showTotal=this.get('showTotal') ? this.get('showTotal') : false;
              }
             if(component == 'donut'){
              this.attributes.attributes.donutType=this.get('donutType') ? this.get('donutType') :'Basic';
             }
          },
          defaults: Object.assign({}, dModel.prototype.defaults, {
            draggable:true,
            droppable:true,
            editable:true,
            traits: self.getTraits(component)
          }),
        }, {
          isComponent: function(el) {
            if(el.tagName == 'CORE-CHART-DATATYPES' || el.tagName=='CORE-GRID-DATATYPES'){
              return {type: 'chart'};
            }
          },
        }),
    
        view: dType
    });

    }

    getTraits(component){
      let arr=[{
          type:'heading',
          name:'heading',
          label:'Title',
          changeProp: 1
        },
        {
          type:'subtitle',
          name:'subtitle',
          label:'Subtitle',
          changeProp: 1
        },
        {
          type:'fontFamily',
          name:'fontFamily',
          label:'Font Family',
          changeProp:1
        },  
        {
          type:'api',
          name:'api',
          label:'API',
          changeProp: 1
        }
       ];
       if(component != 'grid'){
          arr.push.apply(arr,[
            {
              type: 'legendAlign',
              label: 'Legend alignment',
              name: 'legendAlign',
              changeProp:1,
            },
            {
              type: 'tooltipFormat',
              label: 'TooltipFormat',
              name: 'tooltipFormat',
              changeProp:1
            },
            {
                type: 'checkbox',
                label: 'Disable Tooltip',
                name: 'tooltipEnabled',
                changeProp:1
            },
            {
              type: 'checkbox',
              label: 'Enable Data label',
              name: 'enableData',
              changeProp:1
            }
          ]);
       }
       if(component == 'chart'){
        //  arr.push({
        //   type: 'checkbox',
        //   label: 'Enable Stack Label',
        //   name: 'enableStack',
        //   changeProp:1
        // });
         arr.unshift({
           type:'barchartType',
           label:'Chart type',
           name:'barchartType',
           changeProp:1
         });
       }

       if(component == 'pie' || component == 'donut'){
       
        arr.push({
          type: 'checkbox',
          label: 'Show Total',
          name: 'showTotal',
          changeProp:1
        });

       
      }
      if(component == 'donut'){
        arr.unshift({
          type:'donutType',
          label:'Chart type',
          name:'donutType',
          changeProp:1
        });
      }
      if(component == 'grid'){
        arr.push({
          type: 'theme',
          label: 'Theme',
          name: 'theme',
          changeProp:1
        });
      }
       return arr;
    }


    



}

