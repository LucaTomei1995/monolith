import React from "react";
import { Form, Button, Col, Row, Input, Select, Dropdown, Menu } from "antd";
import {
  getMappingViews,
  postMappingAssertion,
  putMappingAssertion
} from "../api/MastroApi";
import { predicateTypes } from "../utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/styles/hljs";
import sqlFormatter from "sql-formatter";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "../css/codeMirror.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";

var CodeMirror = require("react-codemirror");

// const menuString = ["code", "type", "cane", "bestiua"];
// const rangeTemplateString = menuString;
class AssertionForm extends React.Component {
  state = {
    mappingViews: [],
    tables: [],
    menuString: [],
    templateInState: "",
    rangeInState: "",
    mappingAttribute: [],
  };

  componentDidMount() {
    getMappingViews(
      this.props.ontology.name,
      this.props.ontology.version,
      this.props.mappingID,
      this.loaded
    );
    if (this.props.assertion) {
      this.props.form.setFieldsValue({
        template:
          this.props.assertion.mappingHead.firstArg !== null
            ? this.props.assertion.mappingHead.firstArg.replace(
                /(^\w+:|^)\/\//,
                ""
              )
            : null,
        domainTemplate:
          this.props.assertion.mappingHead.firstArg !== null
            ? this.props.assertion.mappingHead.firstArg.replace(
                /(^\w+:|^)\/\//,
                ""
              )
            : null,
        rangeTemplate:
          this.props.assertion.mappingHead.secondArg !== null
            ? this.props.assertion.mappingHead.secondArg.replace(
                /(^\w+:|^)\/\//,
                ""
              )
            : null,
        body: this.props.assertion.mappingBody.bodyFrom[0].sqlViewID
      });
    }

    const codemirrorStyle = document.querySelector(".CodeMirror-scroll");

    codemirrorStyle.classList.add("ant-input");
  }

  loaded = mappingViews => {
    // alert(mappingViews[0].sqlViewID);
    // alert(mappingViews.length);
    var retDict = [];
    var numElements = mappingViews.length;
    for (var i = 0; i < numElements; i++) {
      // alert(mappingViews[i].sqlViewCode);
      retDict.push({
        text: mappingViews[i].sqlViewID,
        displayText: mappingViews[i].sqlViewID
      });
    }
    var sqlList = ["FROM", "JOIN", "ON", "SELECT", "WHERE", "AND"];
    for (var j = 0; j < sqlList.length; j++)
      retDict.push({ text: sqlList[j], displayText: sqlList[j] });

    sqlList = [
      ">",
      ">=",
      "<",
      "=<",
      "=",
      "<>",
      "IS NULL",
      "IS NOT NULL",
      "NOT_IN",
      "BETWEEN",
      "LIKE",
      "NOT_LIKE"
    ];
    var sqlListText = [
      "GREATER THAN",
      "GREATER EQUAL THAN",
      "LESS THAN",
      "LESS EQUAL THAN",
      "EQUALS",
      "NOT EQUALS",
      "IS NULL",
      "IS NOT NULL",
      "NOT IN",
      "BETWEEN",
      "LIKE",
      "NOT LIKE"
    ];
    for (var k = 0; k < sqlList.length; k++)
      retDict.push({ text: sqlList[k], displayText: sqlListText[k] });

    this.setState({ tables: retDict });
    this.setState({ mappingViews });
  };

  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(this.props.form);
      if (!err) {
        const assertion = {
          entityID: this.props.entity.entityID,
          viewName: values.body,
          template:
            this.props.type === predicateTypes.c
              ? values.template
              : values.domainTemplate,
          rangeTemplate:
            this.props.type === predicateTypes.c ? null : values.rangeTemplate
        };

        assertion.template = "http://" + assertion.template;
        if (this.props.type !== predicateTypes.c)
          assertion.rangeTemplate = "http://" + assertion.rangeTemplate;
        if (this.props.assertion) {
          putMappingAssertion(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.assertion.id,
            assertion,
            this.props.rerender
          );
        } else
          postMappingAssertion(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            assertion,
            this.props.rerender
          );
      }
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
    this.props.rerender();
  };

  onSelect = value => {
    this.setState({
      selectedView: this.state.mappingViews.filter(
        v => v.sqlViewID === value
      )[0]
    });
  };

  // Seleziona il testo di rosso che si trova:
    // - Nella linea line
    //      - con parola che inizia in posizione fromCH
    //      - e finisce a posizione toCH
    codeMirrorMarkText = (doc, line, fromCH , toCH) =>{
        doc.markText({
          line: line,
          ch: fromCH
        }, {
          line: line,
          ch: toCH
        }, {
          css: "border-bottom: 2px red dashed;"
        });
    }

    // Rimuove lo stile a tutta la textarea: gli devi passare il doc
    codeRemoveMarkedText = (doc) =>{
        var numLines = this.howManyLinesInCodemirror(doc)
        for(var i = 0; i < numLines; i++){
            var line = doc['children'][0]['lines'][i]
            var numElementInLine = line['text'].length

            doc.markText({
              line: i,
              ch: 0
            }, {
              line: i,
              ch: numElementInLine
            }, {
              css: "border-bottom: 0px;"
            });
        }
    }

    codeMirrorMarkAllText = (doc) =>{
        var numLines = this.howManyLinesInCodemirror(doc)
        for(var i = 0; i < numLines; i++){
            var line = doc['children'][0]['lines'][i]
            var numElementInLine = line['text'].length

            doc.markText({
              line: i,
              ch: 0
            }, {
              line: i,
              ch: numElementInLine
            }, {
              css: "border-bottom: 2px red dashed;"
            });
        }
    }

    codeMirrorMarkTextFromLineToLine = (doc , fromLine , toLine) =>{
        for(var i = fromLine; i <= toLine; i++){
            var line = doc['children'][0]['lines'][i]
            var numElementInLine = line['text'].length

            doc.markText({
              line: i,
              ch: 0
            }, {
              line: i,
              ch: numElementInLine
            }, {
              css: "border-bottom: 2px red dashed;"
            });
        }
    }

    // ritorna il numero di linee presenti nell'editor
    howManyLinesInCodemirror = (doc) => {
        return doc['children'][0]['lines']['length']
    }

    codeMirrorSearchWordInLinesSelect = (doc , fromLine , toLine) =>{
        for(; fromLine < toLine + 1 ; fromLine++){
            let line = doc['children'][0]['lines'][fromLine];
            let lineText = line['text'];
            let elementInLine =  lineText.split(",");
            if(lineText.startsWith(" from ") || lineText.startsWith("from ")){
                break;
            }
            let numElementInLine = this.numItems(lineText);
            for(let i = 0 ; i < numElementInLine ; i++){
                if(!elementInLine[i].includes(" as ")){
                    if(lineText.startsWith("select ")){
                        if(elementInLine[i].includes("select ")){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i].split("select")[1]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]));
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i])  , elementInLine[i].length + lineText.indexOf(elementInLine[i]));    
                        }
                    }
                    else{
                        //check this line maybe error 
                        if(elementInLine[i].includes(" from ")){
                            let temp = elementInLine[i].split(" from ")[0];
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(temp) , temp.length + lineText.indexOf(temp) );
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]) );
                        }
                    }
                } 
            } 

        }
    }

    codeMirrorMarkTextWrongAttribute = (doc , fromLine, toLine , wrongAttribute) =>{
        for(; fromLine < toLine + 1 ; fromLine++){
            let line = doc['children'][0]['lines'][fromLine];
            let lineText = line['text'];
            let elementInLine = lineText.split(",");
            if(lineText.startsWith(" from ") || lineText.startsWith("from ")){
                break;
            }
            let numElementInLine = this.numItems(lineText);
            for(let i = 0 ; i < numElementInLine ; i++){
                if(lineText.startsWith("select ")){
                    if(elementInLine[i].includes("select ")){
                        if(elementInLine[i].split("select ")[1].trim() === wrongAttribute.trim()){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i].split("select")[1]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]));
                        }
                    }
                    else{
                        if(elementInLine[i].trim() === wrongAttribute.trim()){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i])  , elementInLine[i].length + lineText.indexOf(elementInLine[i]));    
                        }
                    }
                }
                else{
                    //check this line maybe error 
                    if(elementInLine[i].includes(" from ")){
                        let temp = elementInLine[i].split(" from ")[0];
                        if(temp.trim() === wrongAttribute.trim()){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(temp) , temp.length + lineText.indexOf(temp) );
                        }
                    }
                    else{
                        if(elementInLine[i].trim() === wrongAttribute.trim()){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]) );
                        }
                    }
                }
            }
        }
    }

    codeMirrorSearchWordInLinesFrom = (doc , fromLine , toLine) =>{
        for(; fromLine < toLine + 1 ; fromLine++){
            let line = doc['children'][0]['lines'][fromLine];
            let lineText = line['text'];
            let elementInLine =  lineText.split(",");
            if(lineText.startsWith(" where ") || lineText.startsWith("where ")){
                break;
            }
            let numElementInLine = this.numItems(lineText);
            for(let i = 0 ; i < numElementInLine ; i++){
                if(!this.existView(elementInLine[i])){
                    if(lineText.startsWith("from ")){
                        if(elementInLine[i].includes("from ")){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i].split("from")[1]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]));
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i])  , elementInLine[i].length + lineText.indexOf(elementInLine[i]));    
                        }
                    }
                    else if(lineText.includes(" from ")){
                        if(elementInLine[i].includes("from ")){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i].split("from")[1]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]));
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]) );    
                        }
                    }
                    else{
                        //check this line maybe error 
                        if(elementInLine[i].includes(" where ")){
                            let temp = elementInLine[i].split(" where ")[0];
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(temp) , temp.length + lineText.indexOf(temp) );
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]) );
                        }
                    }
                } 
            } 

        }
    }

    codeMirrorSearchSpace = (doc , fromLine , toLine) =>{
        for(; fromLine < toLine + 1 ; fromLine++){
            let line = doc['children'][0]['lines'][fromLine];
            let lineText = line['text'];
            let elementInLine =  lineText.split(",");
            if(lineText.startsWith(" from ") || lineText.startsWith("from ")){
                break;
            }
            let numElementInLine = this.numItems(lineText);
            for(let i = 0 ; i < numElementInLine ; i++){
                if(!this.existSpace(elementInLine[i])){
                    if(lineText.trimLeft().startsWith("select ")){
                        if(elementInLine[i].includes("select ")){
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i].split("select")[1]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]));
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i])  , elementInLine[i].length + lineText.indexOf(elementInLine[i]));    
                        }
                    }
                    else{
                        //check this line maybe error 
                        if(elementInLine[i].includes(" from ")){
                            let temp = elementInLine[i].split(" from ")[0];
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(temp) , temp.length + lineText.indexOf(temp) );
                        }
                        else{
                            this.codeMirrorMarkText(doc , fromLine , lineText.indexOf(elementInLine[i]) , elementInLine[i].length + lineText.indexOf(elementInLine[i]) );
                        }
                    }
                } 
            } 
        }
    }

    codeMirrorWrongAttributes = (doc , attributes , numAttributes , wrongAttribute, lineOfStartQuery , lineNumberOfSelect , startOfSelect , lineOfStartFrom) =>{
        let temp = 0;
        for(let i = 0 ; i < numAttributes ; i++){
            if(lineNumberOfSelect === 0){
                if(attributes[i] !== wrongAttribute){
                    temp += attributes[i].length;
                }
                else{
                    this.codeMirrorMarkText(doc , lineOfStartQuery , temp + 7 + startOfSelect + i , wrongAttribute.trim().length + temp + 7 + startOfSelect + i );
                    temp += wrongAttribute.length
                }
            }
            else{
                if(attributes[i] === wrongAttribute){
                    this.codeMirrorMarkTextWrongAttribute(doc , lineOfStartQuery , lineOfStartFrom , wrongAttribute);
                }
            }
        }
    }

    existNewLine = (currentValue) => {
        return currentValue[(currentValue.length)-1] !== "\n";
    }

    haveAlias = (currentValue) => {
            return currentValue.includes(" as ");
    }

    existSpace = (currentValue) => {
        let temp1;
        let temp2;
        if(currentValue.includes(" as ")){
            temp1 = ((typeof currentValue.split(" as ")[0] !== 'undefined') && (currentValue.split(" as ")[0].trim() !== '') && (currentValue.split(" as ")[0] !== '\n'));
            temp2 = ((typeof currentValue.split(" as ")[1] !== 'undefined') && (currentValue.split(" as ")[1].trim() !== '') && (currentValue.split(" as ")[1] !== '\n'));
            return temp1 && temp2;
        }
    }

    existView = (currentValue) => {
        if(this.state.mappingViews.filter(v => v.sqlViewID === currentValue.trim())[0]){
            return true;
        }
        else{
            return false;
        }
    }

    existAttributeInView = (attribute , view) =>{
        let temp = this.optimizeMappingBody(this.state.mappingViews.filter(v => v.sqlViewID === view)[0].sqlViewCode.toLowerCase() , "view")[0].split("select ")[1];
        let tempNum = this.numItems(temp);
        temp = temp.split(",");
        for(let k = 0; k < tempNum ; k++){
            if(temp[k].includes(" as ")){
                temp[k] = temp[k].split(" as ")[1];
            }
            else{
                temp[k] = temp[k].split(" as ")[0];
            }

            if(temp[k].trim() === attribute){
                return true;
            }
        }
        return false;
    }

    nth_occurrence = (string, char, nth) => {
        var first_index = string.indexOf(char);
        var length_up_to_first_index = first_index + 1;

        if (nth === 1) {
            return first_index;
        } else {
            var string_after_first_occurrence = string.slice(length_up_to_first_index);
            var next_occurrence = this.nth_occurrence(string_after_first_occurrence, char, nth - 1);

            if (next_occurrence === -1) {
                return -1;
            } else {
                return length_up_to_first_index + next_occurrence;  
            }
        }
    }

    numItems = (string) => {
            var res = 0;
            var tmp = string;
            if((typeof tmp === 'undefined') || tmp.trim() === ""){
                return res;
            }
            for(var i = 0; i < tmp.length; i++){    if(tmp[i].includes(','))    res += 1;}
            res += 1;
            return res;
    }

    optimizeMappingBody = (string , type) => {
        var editor = document.querySelector(".CodeMirror").CodeMirror;
        var doc = editor.getDoc();
        // var cursor = doc.getCursor();//['line']
        // var line = doc.getLine(cursor.line);

        var select = string;
        var from = "";
        var where = "";
        if(select.trimLeft().startsWith("select")){
            if(select.split("select")[1][0] !== ' '){
                this.codeMirrorMarkAllText(doc);
            }
            else{
                this.codeRemoveMarkedText(doc);
                if(select.includes(" from ")){
                    from = select.substr(select.indexOf(" from ")+1);
                    select = select.substr(0 , select.indexOf(" from ")+1);
                }
                else if(select.includes("from ")){
                    if(!select.split("from ").every(this.existNewLine)){
                        let temp = 0;
                        select.split("from ").forEach(function whereIsThis(currentValue , index){
                                                                if(currentValue[(currentValue.length)-1] === "\n"){
                                                                    if(temp === 0){
                                                                        temp = index+1;
                                                                    }
                                                                }
                                                            });
                        let tempRealIndex = this.nth_occurrence(select , "from " , temp)
                        from = select.substr(tempRealIndex);
                        select = select.substr(0 , tempRealIndex);
                        
                    }
                    else{
                        this.codeMirrorMarkAllText(doc);
                    }
                }
                else{
                    this.codeMirrorMarkAllText(doc);
                }
                if(from !== "" && type !== "view"){
                    if(from.includes(" where ")){
                        where = from.substr(from.indexOf(" where "));
                        from = from.substr(0 , from.indexOf(" where "));
                    }
                    else if(from.includes("where ")){
                        if(!from.split("where ").every(this.existNewLine)){
                            let temp = 0;
                            from.split("where ").forEach(function whereIsThis(currentValue , index){
                                                                    if(currentValue[(currentValue.length)-1] === "\n"){
                                                                        if(temp === 0){
                                                                            temp = index+1;
                                                                        }
                                                                    }
                                                                });
                            let tempRealIndex = this.nth_occurrence(from , "where " , temp)
                            where = from.substr(tempRealIndex);
                            from = from.substr(0 , tempRealIndex);
                        }
                    }
                }
            }
            
        }
        else{
            this.codeMirrorMarkAllText(doc);
        }
        return [select , from , where];
    }

    correctSpaceSelect = (doc , lineOfStartQuery , lineNumberOfSelect , attributes , numAttributes , startOfSelect) => {
        let temp = 0; 
        for(let i = 0 ; i < numAttributes ; i++){
            if(lineNumberOfSelect === 0){
                if(!this.existSpace(attributes[i])){
                    this.codeMirrorMarkText(doc , lineOfStartQuery , temp + 7 + startOfSelect , attributes[i].length + temp + 7 + startOfSelect );
                }
                temp += attributes[i].length;
            }
            else{
                if(!this.existSpace(attributes[i])){
                    this.codeMirrorSearchSpace(doc , lineOfStartQuery , lineOfStartQuery + lineNumberOfSelect )
                }
            }
        }
    }

    correctView = (doc , lineOfStartFrom , lineNumberOfFrom , lengthOfFrom , views , numViews , lineOfStartQuery , lengthOfSelect , lineNumberOfSelect) =>{
        let temp = 0; 
        for(let i = 0 ; i < numViews ; i++){
            if(lineNumberOfFrom === 0){
                if(lineOfStartFrom === lineOfStartQuery){
                    if(this.existView(views[i]) ){
                        temp += views[i].length;
                    }
                    else{
                        this.codeMirrorMarkText(doc , lineOfStartFrom , temp + 5 + lengthOfSelect + i , views[i].length + temp + 5 + lengthOfSelect + i);
                        temp += views[i].length;
                    }
                }
                else{
                    let startOfFrom = doc['children'][0]['lines'][lineOfStartFrom]['text'].length - lengthOfFrom;
                    if(this.existView(views[i])){
                        temp += views[i].length;
                    }
                    else{
                        this.codeMirrorMarkText(doc , lineOfStartFrom , temp + 5 + i + startOfFrom , views[i].length + temp + 5 + i + startOfFrom);
                        temp += views[i].length;
                    }
                }
            }
            else{
                if(!this.existView(views[i])){
                    this.codeMirrorSearchWordInLinesFrom(doc , lineOfStartFrom ,  lineOfStartQuery + lineNumberOfSelect + lineNumberOfFrom )
                }
            }
        }
    }

    analyzeMapping = (mappingSelectFromWhere) =>{
        var editor = document.querySelector(".CodeMirror").CodeMirror
        var doc = editor.getDoc()
        if(mappingSelectFromWhere[0] !== "" && mappingSelectFromWhere[1] !== ""){
            let attributes = mappingSelectFromWhere[0].split("select")[1];
            let views = mappingSelectFromWhere[1].split("from ")[1];
            let numAttributes = this.numItems(attributes);
            let lineNumberOfSelect = mappingSelectFromWhere[0].split("\n").length-1;
            let lineNumberOfFrom = mappingSelectFromWhere[1].split("\n").length-1;
            let startOfSelect = mappingSelectFromWhere[0].indexOf("select ");
            let lengthOfSelect = mappingSelectFromWhere[0].length;
            let lengthOfFrom = mappingSelectFromWhere[1].length;
            let lineOfStartQuery = this.howManyLinesInCodemirror(doc) - lineNumberOfSelect - lineNumberOfFrom - 1;
            let lineOfStartFrom = lineOfStartQuery + lineNumberOfSelect;
            if(numAttributes === 0){
                this.codeMirrorMarkTextFromLineToLine(doc , 0 , this.howManyLinesInCodemirror(doc) - 1);
            }
            else{
                attributes = attributes.split(",");
                if(attributes.every(this.haveAlias)){
                    //controlla se ci sono più as
                    //splitta i cazzo di attributi con as DIO DIO DIO
                    if(!attributes.every(this.existSpace)){
                        this.correctSpaceSelect(doc , lineOfStartQuery , lineNumberOfSelect , attributes , numAttributes , startOfSelect);
                    }
                    else{
                        let numViews = this.numItems(views);
                        if(numViews === 0){
                            this.codeMirrorMarkTextFromLineToLine(doc , 0 , this.howManyLinesInCodemirror(doc) - 1);
                        }
                        else{
                            views = views.split(",");
                            // if(!views.every(this.existSpace)){
                            //     // alert("error nella from");
                            // }
                            if(!views.every(this.existView)){
                                this.correctView(doc , lineOfStartFrom , lineNumberOfFrom , lengthOfFrom , views , numViews , lineOfStartQuery , lengthOfSelect , lineNumberOfSelect);
                            }
                            else{
                                let rightAttributes = [];
                                let wrongAttributes = [];
                                for(let i = 0; i < numAttributes; i++){
                                    for(let j = 0; j < numViews ; j++){
                                        if(this.existAttributeInView(attributes[i].split(" as ")[0].trim() , views[j].trim())){
                                            rightAttributes.push(attributes[i]);
                                            break;
                                        }
                                        else{
                                            wrongAttributes.push(attributes[i]);
                                        }
                                    }
                                }
                                let temp = wrongAttributes.length;
                                //check if numwrongattributes === 0
                                for(let i = 0 ; i < temp ; i++){
                                    if(rightAttributes.includes(wrongAttributes[i])){
                                        wrongAttributes.splice(i , 1);
                                    }
                                }
                                let numWrongAttributes = wrongAttributes.length;
                                for(let i = 0 ; i < numWrongAttributes ; i++){
                                    this.codeMirrorWrongAttributes(doc , attributes , numAttributes , wrongAttributes[i] , lineOfStartQuery , lineNumberOfSelect , startOfSelect ,  lineOfStartFrom);
                                }
                                if(numWrongAttributes === 0){
                                    let numRightAttribute = rightAttributes.length;
                                    for(let i = 0 ; i < numRightAttribute ; i++){
                                        rightAttributes[i] = rightAttributes[i].split(" as ")[1].trim();
                                    }
                                    this.setState({mappingAttribute: rightAttributes});
                                    // alert(this.state.mappingAttribute)
                                }
                            }
                        }
                    }
                }
                else{
                    let temp = 0;
                    for(let i = 0 ; i < numAttributes ; i++){
                        if(lineNumberOfSelect === 0){
                            if(attributes[i].includes(" as ")){
                                temp += attributes[i].length;
                            }
                            else{
                                this.codeMirrorMarkText(doc , lineOfStartQuery , temp + 7 + startOfSelect + i , attributes[i].length + temp + 7 + startOfSelect + i );
                                temp += attributes[i].length
                            }
                        }
                        else{
                            if(!attributes[i].includes(" as ")){
                                this.codeMirrorSearchWordInLinesSelect(doc , lineOfStartQuery , lineOfStartFrom);
                            }
                        }
                    }
                }
            }
        }
    } 

    onChange = (value)=>{
        // var cursor = doc.getCursor()//['line']
        // var line = doc.getLine(cursor.line)
        
        // console.log(cursor);
        // console.log(line);
        // console.log(doc);

        value = value.toLowerCase();
        var mappingSelectFromWhere = this.optimizeMappingBody(value , "mapping");
        this.analyzeMapping(mappingSelectFromWhere);
    }

  getAutoComplete = dbResult => {
    var tab = dbResult;
    var numElements = tab["tables"].length;
    var retDict = [];
    for (var i = 0; i < numElements; i++) {
      var tableName = tab["tables"][i]["name"];
      var listAttributes = tab["tables"][i]["attributes"];
      var numAttributesInTable = listAttributes.length;
      retDict.push({ text: tableName, displayText: tableName }); // name:nometabella,

      for (var j = 0; j < numAttributesInTable; j++) {
        retDict.push({
          text: listAttributes[j],
          displayText: "(Attributo di " + tableName + ")"
        }); // name:nometabella,
      }
    }

    var sqlList = [
      "ALTER",
      "AND",
      "AS",
      "ASC",
      "BETWEEN",
      "BY",
      "COUNT",
      "CREATE",
      "DELETE",
      "DESC",
      "DISTINCT",
      "DROP",
      "FROM",
      "GROUP",
      "HAVING",
      "IN",
      "INSERT",
      "INTO",
      "IS",
      "JOIN",
      "LIKE",
      "NOT",
      "ON",
      "OR",
      "ORDER",
      "SELECT",
      "SET",
      "TABLE",
      "UNION",
      "UPDATE",
      "VALUES",
      "WHERE",
      "LIMIT"
    ];
    for (var k = 0; k < sqlList.length; k++)
      retDict.push({ text: sqlList[k], displayText: sqlList[k] });

    this.setState({ tables: retDict });
  };

  autoComplete = cm => {
    const codeMirror = this.refs["CodeMirror"].getCodeMirrorInstance();
    const hintOptions = {
      tables: this.state.tables,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    };
    codeMirror.showHint(cm, codeMirror.hint.sql, hintOptions);
  };

  handleChange = value => {};

  handleMenutItem = value => {
    if (this.props.type === predicateTypes.c) {
      this.props.form.setFieldsValue({
        template: (document.getElementById("template").value +=
          "{" + value + "}")
      });
    } else if (
      this.props.type === predicateTypes.op ||
      this.props.type === predicateTypes.dp
    ) {
      this.props.form.setFieldsValue({
        domainTemplate: (document.getElementById("domainTemplate").value +=
          "{" + value + "}")
      });
    }
  };

  handleMenutItemForRange = value => {
    this.props.form.setFieldsValue({
      rangeTemplate: (document.getElementById("rangeTemplate").value +=
        "{" + value + "}")
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const options = {
      lineNumbers: true,
      mode: "sql",
      tabSize: 2,
      readOnly: false,
      extraKeys: {
        "Ctrl-Space": this.autoComplete
      }
    };

    const menuItems = () => (
      <Menu style={{ backgroundColor: "var(--medium)" }}>
        {this.state.mappingAttribute.map((i, k) => (
          <Menu.Item
            style={{ backgroundColor: "var(--medium)", color: "white" }}
            onClick={value => this.handleMenutItem(value.item.props.value)}
            value={i}
            key={k}
          >
            {i}
          </Menu.Item>
        ))}
      </Menu>
    );

    const menuItemsForRange = () => (
      <Menu style={{ backgroundColor: "var(--medium)" }}>
        {this.state.mappingAttribute.map((i, k) => (
          <Menu.Item
            style={{ backgroundColor: "var(--medium)", color: "white" }}
            onClick={value =>
              this.handleMenutItemForRange(value.item.props.value)
            }
            value={i}
            key={k}
          >
            {i}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div>
        <CodeMirror
          ref="CodeMirror"
          onChange={this.onChange}
          options={options}
        />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item label="Body">
                {getFieldDecorator("body", {
                  rules: [
                    { required: true, message: "Please enter datasource name" }
                  ]
                })(
                  <Select showSearch onSelect={this.onSelect}>
                    {this.state.mappingViews.map(view => (
                      <Select.Option
                        value={view.sqlViewID}
                        key={view.sqlViewID}
                      >
                        {view.sqlViewID}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.selectedView && (
            <SyntaxHighlighter language="sql" style={darcula}>
              {sqlFormatter.format(this.state.selectedView.sqlViewCode)}
            </SyntaxHighlighter>
          )}
          {this.props.type === predicateTypes.c && (
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item label="Template">
                  {getFieldDecorator("template", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter datasource name"
                      }
                    ]
                  })(<Input addonBefore="http://" />)}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Dropdown overlay={menuItems} placement="bottomLeft">
                  <Button
                    style={{
                      float: "right",
                      backgroundColor: "transparent",
                      marginTop: "90%"
                    }}
                    icon="plus"
                    shape="circle"
                  />
                </Dropdown>
              </Col>
            </Row>
          )}
          {this.props.type === predicateTypes.op && (
            <div>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item label="Domain Template">
                    {getFieldDecorator("domainTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input addonBefore="http://" />)}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown overlay={menuItems} placement="bottomLeft">
                    <Button
                      style={{
                        float: "right",
                        backgroundColor: "transparent",
                        marginTop: "90%"
                      }}
                      icon="plus"
                      shape="circle"
                    />
                  </Dropdown>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item label="Range Template">
                    {getFieldDecorator("rangeTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input addonBefore="http://" />)}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown overlay={menuItemsForRange} placement="bottomLeft">
                    <Button
                      style={{
                        float: "right",
                        backgroundColor: "transparent",
                        marginTop: "90%"
                      }}
                      icon="plus"
                      shape="circle"
                    />
                  </Dropdown>
                </Col>
              </Row>
            </div>
          )}
          {this.props.type === predicateTypes.dp && (
            <div>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item label="Domain Template">
                    {getFieldDecorator("domainTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input addonBefore="http://" />)}
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Dropdown overlay={menuItems} placement="bottomLeft">
                    <Button
                      style={{
                        float: "right",
                        backgroundColor: "transparent",
                        marginTop: "90%"
                      }}
                      icon="plus"
                      shape="circle"
                    />
                  </Dropdown>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item label="Range">
                    {getFieldDecorator("rangeTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
        </Form>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            textAlign: "right"
          }}
        >
          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.submit} type="primary">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const WrappedAssertionForm = Form.create()(AssertionForm);

export default WrappedAssertionForm;
