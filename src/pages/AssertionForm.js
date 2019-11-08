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

class AssertionForm extends React.Component {
  state = {
    mappingViews: [],
    tables: [],
    menuString: [],
    templateInState: "",
    rangeInState: "",
    mappingAttribute: [],
    predicates: [
      ">=",
      "<=",
      "<>",
      ">",
      "<",
      "=",
      "IS NULL",
      "IS NOT NULL",
      "NOT IN",
      "BETWEEN",
      "NOT LIKE",
      "LIKE"
    ],
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
    var retDict = [];
    var numElements = mappingViews.length;
    for (var i = 0; i < numElements; i++) {
      retDict.push({
        text: mappingViews[i].sqlViewID,
        displayText: mappingViews[i].sqlViewID
      });
    }
    var sqlList = ["FROM", "JOIN", "ON", "SELECT", "WHERE", "AND"];
    for (var j = 0; j < sqlList.length; j++)
      retDict.push({ text: sqlList[j], displayText: sqlList[j] });

    var sqlListText = [
      "GREATER EQUAL THAN",
      "LESS EQUAL THAN",
      "NOT EQUALS",
      "GREATER THAN",
      "LESS THAN",
      "EQUALS",
      "IS NULL",
      "IS NOT NULL",
      "NOT IN",
      "BETWEEN",
      "NOT LIKE",
      "LIKE"
    ];
    for (var k = 0; k < this.state.predicates.length; k++)
      retDict.push({ text: this.state.predicates[k], displayText: sqlListText[k] });

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

    existCondition = (currentValue) =>{
        let numPredicates = this.state.predicates.length;
        for(let i = 0 ; i < numPredicates ; i++){
            if(!currentValue.includes(this.state.predicates[i].toLowerCase())){
                if(i+1 === numPredicates){
                    return false;
                }
            }
            else{
                return true;
            }
        }
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

    realCorrectView = (viewList) =>{
    	let numberOfJoin = viewList.split(")").length-1;
    	let listOfJoinOn = viewList.split(")");
    	let listOfViewAlias = [];
    	let listOfCondition = [];
    	for(let i = 0 ; i < numberOfJoin ; i++){
    		let temp1 = listOfJoinOn[i].split(/\son\(|\son\s/).length-1;
    		if(temp1 > 1){
    			return null;
    		}
    		else{
    			if(listOfJoinOn[i].includes(" join ")){
	    			if(i === 0){
	    				listOfViewAlias.push(listOfJoinOn[i].split(" join ")[0]);
	    				listOfViewAlias.push(listOfJoinOn[i].split(" join ")[1].split(/\son\(|\son\s/)[0]);
	    			}
	    			else{
	    				listOfViewAlias.push(listOfJoinOn[i].split(/\son\(|\son\s/)[0].split(" join ")[1]);
	    			}
	    			listOfCondition.push(listOfJoinOn[i].split(/\son\(|\son\s*\(/)[1]);
	    			if(typeof listOfCondition[i] === 'undefined'){
	    				return null;
	    			}
	    		}
	    		else{
	    			return null;
	    		}
    		}
    	}
    	let numberOfView = listOfViewAlias.length;
    	let numberOfCondition = listOfCondition.length;
    	let views = [];
    	let aliases = [];
    	let conditions = [];
    	if(numberOfCondition !== numberOfView-1){
    		return null;
    	}
    	for(let i = 0 ; i < numberOfView ; i++){
    		if(!listOfViewAlias[i].includes(" as ")){
    			return null;
    		}
    		else{
    			views.push(listOfViewAlias[i].split(" as ")[0].trim());
    			if(aliases.includes(listOfViewAlias[i].split(" as ")[1].trim())){
    				return null;
    			}
    			else{
    				aliases.push(listOfViewAlias[i].split(" as ")[1].trim());
    			}
    		}
    	}
    	for(let i = 0 ; i < numberOfCondition ; i++){
    		if(!listOfCondition[i].includes("=") || (listOfCondition[i].split("=").length !== 2)){
    			return null;
    		}
    		else{
    			conditions.push([listOfCondition[i].split("=")[0].trim(),listOfCondition[i].split("=")[1].trim()]);
    			if(!conditions[i][0].includes(".") || !conditions[i][1].includes(".")){
    				return null;
    			}
    		}
    	}
    	return [views , aliases , conditions];
    }

    correctFrom = (views , aliases , conditions) =>{
    	let numConditions = conditions.length;
    	for(let i = 0 ; i < numConditions ; i++){
    		let tempAlias1 = conditions[i][0].split(".")[0].trim();
    		let tempAttr1 = conditions[i][0].split(".")[1].trim();
    		let tempAlias2 = conditions[i][1].split(".")[0].trim();
    		let tempAttr2 = conditions[i][1].split(".")[1].trim();
    		if(!aliases.includes(tempAlias1) || !aliases.includes(tempAlias2)){
    			return false;
    		}
    		else{
    			if(i === 0){
    				if(tempAlias1 === aliases[0] && tempAlias2 === aliases[1]){
    					if(!this.existAttributeInView(tempAttr1 , views[0]) || !this.existAttributeInView(tempAttr2 , views[1])){
    						return false;
    					}	
    				}
    				else if(tempAlias1 === aliases[1] && tempAlias2 === aliases[0]){
    					if(!this.existAttributeInView(tempAttr1 , views[1]) || !this.existAttributeInView(tempAttr2 , views[0])){
    						return false;
    					}	
    				}
    				else{
    					return false;
    				}
    			}
    			else{
    				if(tempAlias1 === aliases[i+1] && this.existAttributeInView(tempAttr1 , views[i+1])){
    					for(let j = 0 ; j <= i ; j++){
    						if(tempAlias2 === aliases[j]){
    							if(!this.existAttributeInView(tempAttr2 , views[j])){
    								return false;
    							}
    							else{
    								break;
    							}
    						}
    						else{
    							if(j+1 > i){
    								return false;
    							}
    						}
    					}
    				}
    				else if(tempAlias2 === aliases[i+1] && this.existAttributeInView(tempAttr2 , views[i+1])){
    					for(let j = 0 ; j <= i ; j++){
    						if(tempAlias1 === aliases[j]){
    							if(!this.existAttributeInView(tempAttr1 , views[j])){
    								return false;
       							}
    							else{
    								break;
    							}
    						}
    						else{
    							if(j+1 > i){
    								return false;
    							}
    						}
    					}
    				}
    				else{
    					return false;
    				}
    			}
    		}
    	}
    	return true;
    }
    correctWhere = (conditionsOfWhere , numConditionsOfWhere) =>{
    	let numPredicates = this.state.predicates.length;
    	let realPredicates = [];
    	let staticVariables = [];
    	let variableVariables = [];
    	let wrongCondition = [];
    	for(let i = 0 ; i < numConditionsOfWhere ; i++){
    		for(let j = 0 ; j < numPredicates ; j++ ){
    			let temp = conditionsOfWhere[i].match(/>=|<=|<>|>|<|=|\sis\s+null\s|\sis\s+not\s+null\s|\snot\s+in\s|\sbetween\s|\snot\s+like\s|\slike\s/);
				if(temp){
					realPredicates.push(temp);
					variableVariables.push(conditionsOfWhere[i].split(temp)[0]);
					staticVariables.push(conditionsOfWhere[i].split(temp)[0]);
					break;
				}
				else if(j+1 === numPredicates){
					wrongCondition.push(conditionsOfWhere[i]);
				}
    		}
    	}
    	alert(realPredicates)
    	return [variableVariables , realPredicates , staticVariables , wrongCondition];
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
            let lineNumberOfWhere = mappingSelectFromWhere[2].split("\n").length-1;
            let startOfSelect = mappingSelectFromWhere[0].indexOf("select ");
            let lengthOfSelect = mappingSelectFromWhere[0].length;
            let lengthOfFrom = mappingSelectFromWhere[1].length;
            let lengthOfWhere = mappingSelectFromWhere[2].length;
            let lineOfStartQuery = this.howManyLinesInCodemirror(doc) - lineNumberOfSelect - lineNumberOfFrom - lineNumberOfWhere - 1;
            let lineOfStartFrom = lineOfStartQuery + lineNumberOfSelect;
            if(numAttributes === 0){
                this.codeMirrorMarkTextFromLineToLine(doc , 0 , this.howManyLinesInCodemirror(doc) - 1);
            }
            else{
                attributes = attributes.split(",");
                if(attributes.every(this.haveAlias)){
                    if(!attributes.every(this.existSpace)){
                        this.correctSpaceSelect(doc , lineOfStartQuery , lineNumberOfSelect , attributes , numAttributes , startOfSelect);
                    }
                    else{
                        let numViews = this.numItems(views);
                        if(numViews === 0){
                            this.codeMirrorMarkTextFromLineToLine(doc , 0 , this.howManyLinesInCodemirror(doc) - 1);
                        }
                        else{
                        	let tempFrom = this.realCorrectView(views);
                        	if(tempFrom === null){
                        		this.codeMirrorMarkTextFromLineToLine(doc , lineOfStartFrom , this.howManyLinesInCodemirror(doc) - 1);
                        	}
                        	else{
                        		let conditions = tempFrom[2];
	                        	views = tempFrom[0];
	                        	let aliases = tempFrom[1];
	                            if(!views.every(this.existView)){
	                                // this.correctView(doc , lineOfStartFrom , lineNumberOfFrom , lengthOfFrom , views , numViews , lineOfStartQuery , lengthOfSelect , lineNumberOfSelect);
	                            }
	                            else{
	                            	if(!this.correctFrom(views , aliases , conditions)){
	                            		// alert("sbagliata");
	                            	}
	                            	else{
	                            		numViews = views.length;
	                            		let rightAttributes = [];
                                		let wrongAttributes = [];
                                		for(let i = 0; i < numAttributes; i++){
                    						let tempAttribute = attributes[i].split(" as ")[0].trim();
                                    		if(tempAttribute.includes(".")){
                                    			let tempView = tempAttribute.split(".")[0].trim();
                                    			let tempAttr = tempAttribute.split(".")[1].trim();
                                    			if(views.includes(tempView)){
                                    				if(this.existAttributeInView(tempAttr , tempView)){
                                    					rightAttributes.push(attributes[i]);
                                    				}
                                    				else{
                                    					wrongAttributes.push(attributes[i]);
                                    				}
                                    			}
                                    			else if(aliases.includes(tempView)){
                                    				let index = aliases.indexOf(tempView);
                                    				if(this.existAttributeInView(tempAttr , views[index])){
                                    					rightAttributes.push(attributes[i]);
                                    				}
                                    				else{
                                    					wrongAttributes.push(attributes[i]);
                                    				}
                                    			}
                                    			else{
                                    				wrongAttributes.push(attributes[i]);
                                    			}
                                    		}
                                    		else{
                                    			wrongAttributes.push(attributes[i]);
                                    		}
                                		}
		                                let numWrongAttributes = wrongAttributes.length;
		                                for(let i = 0 ; i < numWrongAttributes ; i++){
		                                    this.codeMirrorWrongAttributes(doc , attributes , numAttributes , wrongAttributes[i] , lineOfStartQuery , lineNumberOfSelect , startOfSelect ,  lineOfStartFrom);
		                                }
		 							    if(lengthOfWhere !== 0){
		                                    let conditionsOfWhere = mappingSelectFromWhere[2].split("where ")[1];
		                                    let numConditionsOfWhere = conditionsOfWhere.split(" and ").length;
		                                    if(numConditionsOfWhere === 0){
		                                        this.codeMirrorMarkTextFromLineToLine(doc , 0 , this.howManyLinesInCodemirror(doc) - 1);
		                                    }
		                                    else{
		                                        conditionsOfWhere = conditionsOfWhere.split(" and ");
		                                        let tempWhere = this.correctWhere(conditionsOfWhere , numConditionsOfWhere);
		                                        if(typeof tempWhere[3][0] === 'undefined'){
		                                        	let rightPredicates = [];
		                                        	let wrongPredicates = [];
		                                        	for(let i = 0 ; i < tempWhere[0].length ; i++){
		                                        		if(tempWhere[0][i].includes(".")){
		                                        			let tempView = tempWhere[0][i].split(".")[0].trim();
		                                        			let tempAttr = tempWhere[0][i].split(".")[1].trim();
		                                        			if(views.includes(tempView)){
		                                        				if(this.existAttributeInView(tempAttr , tempView)){
		                                        					rightPredicates.push(tempWhere[0][i]);
		                                        				}
		                                        				else{
		                                        					wrongPredicates.push(tempWhere[0][i]);		
		                                        				}
		                                        			}
		                                        			else if(aliases.includes(tempView)){
		                                        				let index = aliases.indexOf(tempView);
			                                    				if(this.existAttributeInView(tempAttr , views[index])){
			                                    					rightPredicates.push(tempWhere[0][i]);
			                                    				}
			                                    				else{
			                                    					wrongPredicates.push(tempWhere[0][i]);
			                                    				}
		                                        			}
		                                        		}
		                                        		else{
		                                        			wrongPredicates.push(tempWhere[0][i]);
		                                        		}
		                                        	}
		                                			if(typeof wrongPredicates[0] === 'undefined' && numWrongAttributes === 0){
		                                				let numRightAttribute = rightAttributes.length;
					                                    for(let i = 0 ; i < numRightAttribute ; i++){
					                                        rightAttributes[i] = rightAttributes[i].split(" as ")[1].trim();
					                                    }
					                                    this.setState({mappingAttribute: rightAttributes});
		                                			}
		                                			else{
		                                				// alert("error");
		                                			}
		                                        }
		                                        else{
		                                			// alert("error predicates");		                                			
		                                        }
		                                    }
		                                }
		                                else{
			                                if(numWrongAttributes === 0){
			                                    let numRightAttribute = rightAttributes.length;
			                                    for(let i = 0 ; i < numRightAttribute ; i++){
			                                        rightAttributes[i] = rightAttributes[i].split(" as ")[1].trim();
			                                    }
			                                    this.setState({mappingAttribute: rightAttributes});
			                                }
			                            }
	                            	}
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
        value = value.toLowerCase();
        var mappingSelectFromWhere = this.optimizeMappingBody(value , "mapping");
        this.analyzeMapping(mappingSelectFromWhere);
    }

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
