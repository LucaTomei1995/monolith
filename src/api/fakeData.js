export const fakeDataGO = [
    {
        "ontologyID": "FIRST",
        "ontologyDescription": "Description for ontology FIRST",
        "ontologyVersions": [
            {
                "ontologyID": "FIRST",
                "versionID": "1.0",
                "versionDescription": "Fisrt of first",
                "versionDate": "25/12/0",
                "numClasses": 20,
                "numObjectProperties": 23,
                "numDataProperties": 34,
                "numAxioms": 1000
            },
            {
                "ontologyID": "FIRST",
                "versionID": "3.0",
                "versionDescription": "Last of first",
                "versionDate": "25/12/0",
                "numClasses": 20,
                "numObjectProperties": 23,
                "numDataProperties": 34,
                "numAxioms": 1000
            },
        ]
    },
    {
        "ontologyID": "ACI",
        "ontologyDescription": "Description for ontology ACI",
        "ontologyVersions": [
            {
                "ontologyID": "ACI",
                "versionID": "1.0",
                "versionDescription": "Fisrt of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20,
                "numObjectProperties": 23,
                "numDataProperties": 34,
                "numAxioms": 1000
            },
            {
                "ontologyID": "ACI",
                "versionID": "1.1",
                "versionDescription": "Second of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20,
                "numObjectProperties": 23,
                "numDataProperties": 34,
                "numAxioms": 1000
            },
            {
                "ontologyID": "ACI",
                "versionID": "323.0",
                "versionDescription": "LAST of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20,
                "numObjectProperties": 23,
                "numDataProperties": 34,
                "numAxioms": 1000
            },
        ]
    },
]
export const fakeDataOI = {
    ontologyIRI: "http://www.example.com/ACI",
    ontologyImports: [
        "http://www.aci.it/ACI",
        "http://www.lod-aci.com/ACI"
    ],
    ontologyPrefixManager: [{
        mapKey: 'aci:',
        mapValue: 'http://www.example.com/ACI#'
    }, {
        mapKey: 'rdf:',
        mapValue: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    }],
    ontologyDescriptions: [
        "First descritpion",
        "Second descritpion",
        "Last descritpion"
    ],
    ontologyMetrics: {
        metrics: [{
            mapKey: 'Axioms:',
            mapValue: '234500'
        }, {
            mapKey: 'Classes:',
            mapValue: '2345'
        }, {
            mapKey: 'Object Properties:',
            mapValue: '2'
        }, {
            mapKey: 'Data Properties:',
            mapValue: '2000000'
        }],
        classAxioms: [{
            mapKey: 'SubClassOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointClasses',
            mapValue: '3'
        }],
        objectPropertyAxioms: [{
            mapKey: 'SubObjectPropertyOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointObjectProperties',
            mapValue: '3'
        }],
        dataPropertyAxioms: [{
            mapKey: 'SubDataPropertyOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointDataProperty',
            mapValue: '3'
        }],
        individualAxioms: [{
            mapKey: 'ClassAssertion:',
            mapValue: '99999'
        }, {
            mapKey: 'ObjectPropertyAssertion',
            mapValue: '3'
        }],
        annotationAxioms: [{
            mapKey: 'AnnotationAssertion:',
            mapValue: '99999'
        }],
    }
}

export const mastroData = { "hierarchyTree": { "classTree": { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Standard_Euro", "entityID": "CL_76", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.w3.org/2002/07/owl#Thing", "entityID": "CL_341", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#LicenseDocument", "entityID": "CL_164", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Vincolo_o_gravame", "entityID": "CL_221", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionaleFinalita_iscrizione_ipoteca_o_privilegio_convenzionale", "entityID": "CL_219", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_per_credito_erariale", "entityID": "CL_293", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_giudiziale", "entityID": "CL_37", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca", "entityID": "CL_98", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_privilegio", "entityID": "CL_281", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_per_residuo_prezzo", "entityID": "CL_78", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_per_sovvenzione_prezzo", "entityID": "CL_202", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_legale", "entityID": "CL_58", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_speciale_artigiano", "entityID": "CL_346", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio_per_convenzione_artigiana", "entityID": "CL_290", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_ipoteca_o_privilegio", "entityID": "CL_313", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_postergazione_ipoteca", "entityID": "CL_276", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessione_ipoteca", "entityID": "CL_301", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_riduzione_ipoteca_o_privilegio", "entityID": "CL_265", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_ipoteca_o_privilegio", "entityID": "CL_330", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_surrogazione_ipoteca", "entityID": "CL_113", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rinnovo_iscrizione_ipoteca", "entityID": "CL_239", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_gestione_ipoteca_o_privilegio", "entityID": "CL_237", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rinnovo_di_iscrizione_per_furto_targa", "entityID": "CL_22", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rinnovo_di_iscrizione_per_distruzione_targa", "entityID": "CL_9", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rinnovo_di_iscrizione_per_smarrimento_targa", "entityID": "CL_213", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rinnovo_di_iscrizione", "entityID": "CL_308", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trasferimento_di_iscrizione", "entityID": "CL_258", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/Alimentazione", "entityID": "CL_367", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Consiglio_di_zona_di_Milano", "entityID": "CL_234", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Municipio_di_Roma", "entityID": "CL_99", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Zona_di_decentramento", "entityID": "CL_224", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessione_beni_creditori", "entityID": "CL_310", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_tipo_di_finalita", "entityID": "CL_207", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_proroga_di_usufrutto", "entityID": "CL_102", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessione_di_usufrutto", "entityID": "CL_101", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_costituzione_di_usufrutto", "entityID": "CL_14", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_estinzione_di_usufrutto", "entityID": "CL_368", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_gestione_usufrutto", "entityID": "CL_288", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trascrizione_atto_vendita", "entityID": "CL_104", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_prima_iscrizione_di_veicolo_nuovo", "entityID": "CL_358", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_prima_iscrizione_di_veicolo_usato", "entityID": "CL_196", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rettifica_dati_accessori", "entityID": "CL_289", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rettifica_iscrizione_proprieta", "entityID": "CL_312", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_definizione_o_modifica_intestazione_veicolo", "entityID": "CL_382", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_acquisto_di_possesso", "entityID": "CL_220", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_requisizione_della_PA", "entityID": "CL_31", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_fatto_di_terzo", "entityID": "CL_143", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_sequestro_della_PA", "entityID": "CL_373", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_sequestro_della_AG", "entityID": "CL_299", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_furto", "entityID": "CL_121", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_rinuncia_eredita", "entityID": "CL_371", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_provvedimento_fallimento", "entityID": "CL_390", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_pignoramento", "entityID": "CL_337", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_sentenza_di_fallimento", "entityID": "CL_282", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_appropriazione_indebita", "entityID": "CL_33", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_confisca_penale", "entityID": "CL_38", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_atto_volontario", "entityID": "CL_333", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso_per_confisca_della_PA", "entityID": "CL_350", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_perdita_di_possesso", "entityID": "CL_295", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trascrizione_concordato_preventivo", "entityID": "CL_194", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_riscontro_stato_giuridico_originario", "entityID": "CL_360", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_annotazione_sospensione_carta_circolazione", "entityID": "CL_95", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_mirata_ad_aggiungere_stato_rappresentato", "entityID": "CL_7", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessazione_circolazione_per_cancellazione_ex_art_80", "entityID": "CL_144", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessazione_circolazione_per_ritiro_in_aree_private", "entityID": "CL_105", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_dismessa", "entityID": "CL_108", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_riscossione_somme_prenotate_a_debito", "entityID": "CL_89", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_apposizione_visto_su_effetti", "entityID": "CL_29", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rilascio_o_duplicato_CDP", "entityID": "CL_267", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rimborso_importi_PRA", "entityID": "CL_131", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita", "entityID": "CL_191", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/DataSet_statistico", "entityID": "CL_298", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://purl.org/linked-data/cube#DataSet", "entityID": "CL_226", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_condiz_clausola", "entityID": "CL_335", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tipo_di_atto", "entityID": "CL_32", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Agevolazione", "entityID": "CL_124", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rientro_in_possesso", "entityID": "CL_270", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_rottamato", "entityID": "CL_110", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_cessazione_dalla_circolazione", "entityID": "CL_39", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_veicolo_rappresentato_in_formalita", "entityID": "CL_273", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_soggetto_registrato_per_veicolo", "entityID": "CL_352", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_veicolo_non_giuridico", "entityID": "CL_82", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_veicolo_rappresentato_in_finalita", "entityID": "CL_25", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_veicolo_giuridico", "entityID": "CL_24", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_rappresentato_dal_PRA", "entityID": "CL_268", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_soggetto_rappresentato_in_applicazione_di_bollo_auto", "entityID": "CL_355", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_di_veicolo_rappresentato_in_applicazione_di_bollo_auto", "entityID": "CL_351", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_rappresentato_su_versamento", "entityID": "CL_190", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_rappresentato", "entityID": "CL_235", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rappresentazione_nel_PRA", "entityID": "CL_128", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rappresentazione_nel_ruolo_tributario", "entityID": "CL_73", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Rappresentazione", "entityID": "CL_125", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trascrizione_fallimento", "entityID": "CL_361", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trascrizione_domanda_giudiziale", "entityID": "CL_325", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_domanda_giudiziale", "entityID": "CL_319", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_gestione_vincolo", "entityID": "CL_354", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Quota_del_dovuto", "entityID": "CL_374", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Alimentazione", "entityID": "CL_401", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/DataSet", "entityID": "CL_377", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://purl.org/dc/dcmitype/DataSet", "entityID": "CL_138", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_di_circolazione", "entityID": "CL_384", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_di_possesso", "entityID": "CL_347", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_auto_di_circolazione", "entityID": "CL_212", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_auto_di_possesso", "entityID": "CL_193", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_auto_di_regione", "entityID": "CL_168", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Bollo_auto", "entityID": "CL_356", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_variazione_caratteristiche_tecniche", "entityID": "CL_20", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_proroga_locazione", "entityID": "CL_280", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cessione_locazione", "entityID": "CL_253", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_iscrizione_locazione", "entityID": "CL_186", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_locazione", "entityID": "CL_179", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_gestione_locazione", "entityID": "CL_51", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Entita_del_mondo", "entityID": "CL_6", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Periodo_fiscale_per_tributo_operativo", "entityID": "CL_27", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Targa_speciale", "entityID": "CL_362", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Targa_estera", "entityID": "CL_316", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Targa_nazionale", "entityID": "CL_94", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Targa_veicolo", "entityID": "CL_116", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Certificato_di_proprieta_duplicato", "entityID": "CL_199", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Certificato_di_proprieta", "entityID": "CL_68", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Sentenza", "entityID": "CL_52", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Istanza_acquirente", "entityID": "CL_23", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_pubblico", "entityID": "CL_230", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Nota_di_trascrizione", "entityID": "CL_151", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_non_registrato", "entityID": "CL_291", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Istanza_venditore", "entityID": "CL_304", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_di_vendita", "entityID": "CL_215", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_societario", "entityID": "CL_35", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_amministrativo", "entityID": "CL_189", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Scrittura_privata", "entityID": "CL_303", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_soggetto_ad_IVA", "entityID": "CL_182", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Verbale_di_sequestro", "entityID": "CL_386", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Verbale_di_pignoramento", "entityID": "CL_318", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Verbale", "entityID": "CL_363", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto_registrato", "entityID": "CL_349", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tutela_venditore", "entityID": "CL_91", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Atto", "entityID": "CL_275", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Imposta_diretta", "entityID": "CL_240", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Imposta_di_bollo", "entityID": "CL_336", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/IPT", "entityID": "CL_173", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Imposta_indiretta", "entityID": "CL_402", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Imposta", "entityID": "CL_195", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tassa", "entityID": "CL_287", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tributo_operativo_con_periodi_fiscali", "entityID": "CL_209", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tributo_operativo_senza_periodi_fiscali", "entityID": "CL_203", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Tributo_operativo", "entityID": "CL_126", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Tributo", "entityID": "CL_272", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Evento_di_generazione", "entityID": "CL_247", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Evento_con_impatto_su_periodo_tributario", "entityID": "CL_400", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Evento", "entityID": "CL_77", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Locazione", "entityID": "CL_46", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Usufrutto", "entityID": "CL_366", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Patto_RD_risolto", "entityID": "CL_183", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Patto_RD_con_liberatoria", "entityID": "CL_80", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Patto_RD", "entityID": "CL_283", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Possesso_di_funzionalita", "entityID": "CL_223", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_contributiva_imposta_di_bollo", "entityID": "CL_3", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_contributiva_bollo_auto", "entityID": "CL_50", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_contributiva_IPT", "entityID": "CL_238", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_con_pagamento_fisso", "entityID": "CL_408", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_con_soglia", "entityID": "CL_157", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_contributiva_di_veicolo", "entityID": "CL_153", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Classe_contributiva", "entityID": "CL_97", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato_con_comunicazione", "entityID": "CL_49", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Stato", "entityID": "CL_133", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Proprieta_soggetta_a_trust", "entityID": "CL_63", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Intestazione", "entityID": "CL_389", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Proprieta", "entityID": "CL_385", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_IPT_con_agevolazione_per_trasferimento_proprieta_a_concessionario", "entityID": "CL_403", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_IPT_con_agevolazione_per_stato_di_calamita", "entityID": "CL_378", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_IPT", "entityID": "CL_269", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_bollo_auto_per_rientro", "entityID": "CL_64", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_bollo_auto_per_veicolo_storico", "entityID": "CL_248", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_bollo_auto_non_esigibile", "entityID": "CL_255", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_bollo_auto_per_integrazione_per_modifica_dato_tecnico", "entityID": "CL_404", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_bollo_auto", "entityID": "CL_120", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_tributo_a_veicolo", "entityID": "CL_242", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trascrizione_provvedimento_concorsuale", "entityID": "CL_245", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trascrizione_o_cancellazione_domanda_giudiziale", "entityID": "CL_251", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rimborso_importi_PRA", "entityID": "CL_320", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Cancellazione_provvedimento_giudiziale", "entityID": "CL_55", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trascrizione_provvedimento_giudiziale", "entityID": "CL_71", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_richiesta_da_ufficio", "entityID": "CL_407", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_respinta", "entityID": "CL_338", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_richiesta_da_utente", "entityID": "CL_178", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Riscossione_somme_prenotate_a_debito", "entityID": "CL_85", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Apposizione_visto_su_effetti", "entityID": "CL_345", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_non_sulla_rappresentazione", "entityID": "CL_398", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rinnovo_di_iscrizione_da_altra_provincia", "entityID": "CL_329", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_dismessa", "entityID": "CL_332", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_convalidata", "entityID": "CL_328", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rettifica_ipoteca_o_privilegio", "entityID": "CL_184", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Proroga_patto_riservato_dominio", "entityID": "CL_12", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Variazione_caratteristiche_tecniche", "entityID": "CL_217", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trascrizione_atto_vendita", "entityID": "CL_166", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trasferimento_di_residenza", "entityID": "CL_391", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_di_variazione", "entityID": "CL_309", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rettifica_dati_accessori", "entityID": "CL_109", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rettifica_iscrizione_proprieta", "entityID": "CL_117", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_sulla_rappresentazione", "entityID": "CL_393", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita_ricusata", "entityID": "CL_171", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Formalita", "entityID": "CL_45", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autorizzazione_al_sequestro_legge_646", "entityID": "CL_250", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autorizzazione_al_congelamento_dei_beni", "entityID": "CL_43", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_di_fallimento", "entityID": "CL_284", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Revoca_congelamento_beni", "entityID": "CL_241", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Omologazione_di_concordato_preventivo", "entityID": "CL_211", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autorizzazione_al_pignoramento", "entityID": "CL_279", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_giudiziale", "entityID": "CL_286", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_di_fermo_amministrativo", "entityID": "CL_149", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Revoca_di_fermo_amministrativo", "entityID": "CL_383", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_amministrativo", "entityID": "CL_134", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Sgravio_totale_per_indebito", "entityID": "CL_36", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Annullamento_per_vendita_anteriore", "entityID": "CL_274", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_di_cancellazione", "entityID": "CL_370", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento_attuativo", "entityID": "CL_357", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Provvedimento", "entityID": "CL_75", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Denotazione_di_luogo_estera", "entityID": "CL_57", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Denotazione_indirizzo_di_residenza_in_applicazione_di_bollo_auto", "entityID": "CL_379", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Denotazione_indirizzo_per_soggetto_in_veicolo", "entityID": "CL_302", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Denotazione_di_luogo", "entityID": "CL_118", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Entita_non_avente_stati", "entityID": "CL_188", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Pacchetto_di_formalita", "entityID": "CL_410", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Ufficio_PRA", "entityID": "CL_146", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_rettifica_di_ipoteca_o_privilegio", "entityID": "CL_206", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Versamento_tributo", "entityID": "CL_79", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Riscossione_iniziale", "entityID": "CL_160", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_imposta_di_bollo_per_nota_di_trascrizione", "entityID": "CL_62", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_imposta_di_bollo_per_CDP", "entityID": "CL_148", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_imposta_di_bollo", "entityID": "CL_93", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Applicazione_di_tributo", "entityID": "CL_150", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_comunale", "entityID": "CL_406", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_di_ufficio", "entityID": "CL_65", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_provinciale", "entityID": "CL_260", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_regionale", "entityID": "CL_409", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_metropolitana", "entityID": "CL_129", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione_nazionale", "entityID": "CL_327", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Circoscrizione", "entityID": "CL_8", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Accesso", "entityID": "CL_353", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Centro_urbano", "entityID": "CL_84", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Strada", "entityID": "CL_252", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Luogo", "entityID": "CL_315", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Filobus", "entityID": "CL_161", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Filoveicolo", "entityID": "CL_4", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Motociclo_con_passeggero", "entityID": "CL_147", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Motocarrozzetta", "entityID": "CL_263", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Motociclo_a_solo", "entityID": "CL_372", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Motociclo", "entityID": "CL_175", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Motocarro", "entityID": "CL_176", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Triciclo", "entityID": "CL_261", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Ciclomotore", "entityID": "CL_216", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Quadriciclo_a_motore_leggero", "entityID": "CL_244", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Quadriciclo_a_motore_pesante", "entityID": "CL_340", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Quadriciclo", "entityID": "CL_96", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Motoveicolo", "entityID": "CL_72", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tram", "entityID": "CL_397", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_ferroviario", "entityID": "CL_174", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trattore_agricolo", "entityID": "CL_122", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Macchina_agricola_semovente", "entityID": "CL_233", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Trattore_stradale", "entityID": "CL_264", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autovettura", "entityID": "CL_369", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autobus", "entityID": "CL_306", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autocaravan", "entityID": "CL_90", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autocarro", "entityID": "CL_307", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Autoveicolo", "entityID": "CL_10", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_con_motore_elettrico", "entityID": "CL_322", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_con_motore_a_combustione", "entityID": "CL_411", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_a_motore", "entityID": "CL_210", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Rimorchio", "entityID": "CL_135", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Semirimorchio", "entityID": "CL_1", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_a_trazione_di_veicolo_a_motore", "entityID": "CL_243", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_non_a_motore", "entityID": "CL_256", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_non_registrabile_al_PRA", "entityID": "CL_271", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_registrabile_al_PRA", "entityID": "CL_394", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo_con_numero_di_telaio", "entityID": "CL_114", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Veicolo", "entityID": "CL_197", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Tipo_di_finalita", "entityID": "CL_205", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autorita_amministrativa", "entityID": "CL_107", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Autorita_giudiziaria", "entityID": "CL_162", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Femmina", "entityID": "CL_5", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Maschio", "entityID": "CL_26", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Femalea_fisica", "entityID": "CL_53", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Ente_privato", "entityID": "CL_277", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Regione", "entityID": "CL_185", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Ufficio_periferico", "entityID": "CL_317", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Citta_metropolitana", "entityID": "CL_388", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Comune", "entityID": "CL_187", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Provincia", "entityID": "CL_331", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Nazione", "entityID": "CL_311", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Ente_territoriale", "entityID": "CL_375", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Ente_pubblico", "entityID": "CL_227", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Femalea_giuridica", "entityID": "CL_236", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Femalea", "entityID": "CL_364", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Soggetto", "entityID": "CL_198", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Entita_avente_stati", "entityID": "CL_136", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/Radiati_per_comune_per_euro_in_anno", "entityID": "CL_231", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/Immatricolati_per_comune_per_alimentazione_in_anno", "entityID": "CL_222", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/opendataontology/Osservazione_statistica", "entityID": "CL_34", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://purl.org/linked-data/cube#Observation", "entityID": "CL_44", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Sospensione_giacenza_rivenditore", "entityID": "CL_225", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Sospensione", "entityID": "CL_259", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/Osservazione", "entityID": "CL_326", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_trasferimento_di_residenza", "entityID": "CL_119", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Pagamento", "entityID": "CL_17", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_stipula_patto_riservato_dominio", "entityID": "CL_405", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_patto_riservato_dominio_con_risoluzione", "entityID": "CL_54", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_cancellazione_patto_riservato_dominio_con_liberatoria", "entityID": "CL_28", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_proroga_patto_riservato_dominio", "entityID": "CL_69", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/Finalita_gestione_patto_riservato_dominio", "entityID": "CL_11", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, "objectPropertyTree": { "children": [{ "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#creator", "entityID": "OP_446", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/versamento_per_applicazione_di_tributo", "entityID": "OP_486", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_sede_legale", "entityID": "OP_491", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_sede", "entityID": "OP_550", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_collocazione", "entityID": "OP_557", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/veicolo_ha_targhe_assegnate", "entityID": "OP_443", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/IPT_applicata_per_formalita", "entityID": "OP_492", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/proprieta_di", "entityID": "OP_453", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_regione", "entityID": "OP_430", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/comune_residenza_in_applicazione_di_bollo_auto", "entityID": "OP_484", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativo_a_bollo", "entityID": "OP_499", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/indirizzo_di_residenza_intestatario_in_applicazione_di_bollo_auto", "entityID": "OP_452", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/provvedimento_emesso_da", "entityID": "OP_548", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_targa_precedente", "entityID": "OP_521", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/regione_residenza_in_applicazione_di_bollo_auto", "entityID": "OP_455", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_provincia", "entityID": "OP_535", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_tipo_finalita", "entityID": "OP_479", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_veicolo_rappresentato_in_applicazione_di_bollo_auto", "entityID": "OP_554", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/per_classe_contributiva_di_imposta_di_bollo", "entityID": "OP_509", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/genera_atto", "entityID": "OP_449", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#contributor", "entityID": "OP_553", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/richiesta_per_finalita", "entityID": "OP_527", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/contiene_osservazione", "entityID": "OP_563", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/dati_tecnici_veicolo_per_formalita", "entityID": "OP_501", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/proprieta_relativa_a", "entityID": "OP_529", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_trustee_di", "entityID": "OP_472", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ripresentata_per", "entityID": "OP_512", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/bollo_per_formalita", "entityID": "OP_418", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/pignoramento_ha_creditore", "entityID": "OP_480", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/patto_rd_su", "entityID": "OP_467", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/locazione_di", "entityID": "OP_460", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/usufrutto_di", "entityID": "OP_552", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/possesso_di", "entityID": "OP_551", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/provvedimento_richiesto_da", "entityID": "OP_432", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_proprieta_dimensionale_comune", "entityID": "OP_518", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_proprieta_dimensionale_Euro", "entityID": "OP_565", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_proprieta_dimensionale_alimentazione", "entityID": "OP_415", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_proprieta_dimensionale", "entityID": "OP_458", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_provincia", "entityID": "OP_476", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/atto_di_vendita_apposto_su", "entityID": "OP_531", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/basato_su", "entityID": "OP_536", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_vincolo_o_gravame", "entityID": "OP_445", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_comune", "entityID": "OP_541", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/influisce_sul_calcolo_dovuto", "entityID": "OP_507", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_di_regione", "entityID": "OP_547", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/operato_da", "entityID": "OP_465", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#rightsHolder", "entityID": "OP_428", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_rappresentato_da", "entityID": "OP_442", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_soggetto_rappresentato_in_applicazione_di_bollo_auto", "entityID": "OP_495", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_soggetto_venditore", "entityID": "OP_502", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#publisher", "entityID": "OP_435", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_classificazione_Euro", "entityID": "OP_519", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/emette_certificato", "entityID": "OP_425", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/indirizzo_di_residenza_contribuente_in_applicazione_di_bollo_auto", "entityID": "OP_561", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_indirizzo_di_residenza", "entityID": "OP_546", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/determina_stato", "entityID": "OP_543", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/pacchetto_include_formalita", "entityID": "OP_490", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_alimentazione", "entityID": "OP_504", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_tipo_di_finalita", "entityID": "OP_424", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_luogo", "entityID": "OP_438", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_soggetto", "entityID": "OP_498", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato_di_veicolo", "entityID": "OP_471", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_stato", "entityID": "OP_412", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_esenzione_per", "entityID": "OP_426", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/cancella_provvedimento", "entityID": "OP_559", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativo_a_applicazione_di_tributo", "entityID": "OP_516", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stipula_patto_RD", "entityID": "OP_488", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_traente_di", "entityID": "OP_474", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_locatario_di", "entityID": "OP_475", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/est_possessore_di", "entityID": "OP_451", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/usufruisce_di_agevolazione", "entityID": "OP_462", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_venditore_in_stato_di_veicolo", "entityID": "OP_564", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_denotazione", "entityID": "OP_530", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_classe_contributiva", "entityID": "OP_450", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#license", "entityID": "OP_533", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/formalita_genera_evento", "entityID": "OP_549", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_locatore_di", "entityID": "OP_525", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_intestatario_per_applicazione_di_bollo_auto", "entityID": "OP_427", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_contribuente_per_applicazione_di_bollo_auto", "entityID": "OP_434", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_soggetto_per_applicazione_di_bollo_auto", "entityID": "OP_542", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_predecessore", "entityID": "OP_528", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/partecipa_a_luogo", "entityID": "OP_497", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_valenza_in", "entityID": "OP_560", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/rappresentazione_fatta_da", "entityID": "OP_539", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_indirizzo_di_nascita", "entityID": "OP_470", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_a_veicolo", "entityID": "OP_487", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_da_comunicare_a", "entityID": "OP_456", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_traente_di_usufrutto_in_stato_di_veicolo", "entityID": "OP_444", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_stipulatore_PRD_in_stato_di_veicolo", "entityID": "OP_544", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_locatario_in_stato_di_veicolo", "entityID": "OP_423", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_locatore_in_stato_di_veicolo", "entityID": "OP_440", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_creditore_in_stato_di_veicolo", "entityID": "OP_416", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_settler_in_stato_di_veicolo", "entityID": "OP_511", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_attore_in_stato_di_veicolo", "entityID": "OP_524", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_trustee_in_stato_di_veicolo", "entityID": "OP_505", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_intestatario_in_stato_di_veicolo", "entityID": "OP_420", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_ruolo_in_stato_veicolo", "entityID": "OP_433", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/provincia_residenza_in_applicazione_di_bollo_auto", "entityID": "OP_447", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_tipo_atto", "entityID": "OP_457", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_a_tributo_operativo", "entityID": "OP_508", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_formalita_originaria", "entityID": "OP_419", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/proviene_da_veicolo", "entityID": "OP_556", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/a_copertura_di", "entityID": "OP_466", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/registrazione_nazione", "entityID": "OP_532", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_aggregata_in", "entityID": "OP_503", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/patto_RD_per", "entityID": "OP_464", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/usufrutto_relativo_a", "entityID": "OP_496", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/locazione_relativa_a", "entityID": "OP_510", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/possesso_relativo_a", "entityID": "OP_414", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_veicolo_per_applicazione_di_bollo_auto", "entityID": "OP_558", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_variato_in", "entityID": "OP_540", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://purl.org/linked-data/cube#dataSet", "entityID": "OP_448", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/formalita_presentata_per_veicolo", "entityID": "OP_417", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/paga_a_riscossore", "entityID": "OP_482", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_quota", "entityID": "OP_522", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_comune", "entityID": "OP_429", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/esegue_provvedimento", "entityID": "OP_514", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/classe_per_tipo_di_atto", "entityID": "OP_517", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_a_contribuente", "entityID": "OP_468", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_a_intestatario", "entityID": "OP_523", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_a_soggetto", "entityID": "OP_469", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/acquisisce_atto", "entityID": "OP_526", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_circoscrizione", "entityID": "OP_461", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_targa", "entityID": "OP_520", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ipoteca_ha_creditore", "entityID": "OP_494", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_venditore", "entityID": "OP_515", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/versamento_effettuato_da", "entityID": "OP_413", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/rappresenta", "entityID": "OP_459", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/compare_in_dataset", "entityID": "OP_506", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/nota_di_trascrizione_apposta_su", "entityID": "OP_493", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/classe_per_finalita", "entityID": "OP_483", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/rende_operativo", "entityID": "OP_473", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_di_competenza_di_ufficio", "entityID": "OP_437", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/dati_in_versamento", "entityID": "OP_538", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/stato_comunicato_a", "entityID": "OP_422", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_regione", "entityID": "OP_431", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/dati_per_finalita", "entityID": "OP_439", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_acquirente", "entityID": "OP_481", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/relativa_ad_atto", "entityID": "OP_478", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/determina_oggetto", "entityID": "OP_545", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/applicata_ad_applicazione_di_bollo_auto", "entityID": "OP_489", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_settler_di", "entityID": "OP_436", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/richiede_formalita", "entityID": "OP_513", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_proroga_di", "entityID": "OP_477", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/sostituisce", "entityID": "OP_463", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/per_classe_contributiva_con_eccezione", "entityID": "OP_485", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/per_classe_contributiva_di_veicolo", "entityID": "OP_421", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_residenza_in_regione", "entityID": "OP_534", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_residenza_in_comune", "entityID": "OP_454", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_residenza_in_accesso", "entityID": "OP_555", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_residenza_in_provincia", "entityID": "OP_562", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/ha_residenza", "entityID": "OP_500", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/est_primo_intestatario", "entityID": "OP_537", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/est_proprietario_di", "entityID": "OP_441", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, "dataPropertyTree": { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_consegna_al_demolitore", "entityID": "DP_695", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_misura_conteggio", "entityID": "DP_639", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/opendataontology/ha_misura", "entityID": "DP_678", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_quota", "entityID": "DP_616", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_finalita", "entityID": "DP_665", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ruolo_stato_di_soggetto", "entityID": "DP_662", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_termine_pagamento_periodo_tributario", "entityID": "DP_636", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/controllo", "entityID": "DP_654", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_residuo_ipoteca", "entityID": "DP_675", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tara", "entityID": "DP_738", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_impianto_in_applicazione_di_bollo_auto", "entityID": "DP_610", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/progressivo", "entityID": "DP_759", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/sospensioni_pneumatiche", "entityID": "DP_671", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/inizio_periodo", "entityID": "DP_701", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_atto_proprieta", "entityID": "DP_677", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/classe_veicolo", "entityID": "DP_588", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/versato_quota", "entityID": "DP_593", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/nome_finalita", "entityID": "DP_723", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_ricusazione_formalita", "entityID": "DP_674", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_decorrenza_periodo_tributario", "entityID": "DP_637", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/inizio_validita", "entityID": "DP_590", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ID_veicolo", "entityID": "DP_640", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/carrozzeria", "entityID": "DP_667", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/destinazione_di_uso", "entityID": "DP_650", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/sovrattassa_IPT", "entityID": "DP_690", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_quota_capitale_ipoteca", "entityID": "DP_708", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_cessazione_circolazione", "entityID": "DP_680", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ID_veicolo_in_applicazione_di_bollo_auto", "entityID": "DP_725", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_esenzione_IPT", "entityID": "DP_754", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/indirizzo_estero", "entityID": "DP_682", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_denotazione_di_luogo", "entityID": "DP_575", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/interessi_IPT", "entityID": "DP_733", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/zipcode", "entityID": "DP_638", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/anno_statistica", "entityID": "DP_614", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/anzianita_veicolo_in_applicazione_di_bollo_auto", "entityID": "DP_607", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_trust", "entityID": "DP_571", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_proprieta", "entityID": "DP_659", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_postergato", "entityID": "DP_602", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_assi", "entityID": "DP_753", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_sospensione", "entityID": "DP_724", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_scadenza_ipoteca", "entityID": "DP_673", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/congruenza_calcolato_dichiarato", "entityID": "DP_726", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_locazione", "entityID": "DP_736", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_usufrutto", "entityID": "DP_591", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_scadenza_patto_RD", "entityID": "DP_721", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_possesso", "entityID": "DP_580", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_atto", "entityID": "DP_621", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_perdita_di_possesso", "entityID": "DP_574", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_Femalea", "entityID": "DP_657", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_accensione_patto_RD", "entityID": "DP_745", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_usufrutto", "entityID": "DP_604", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_locazione", "entityID": "DP_578", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_possesso", "entityID": "DP_608", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/kw", "entityID": "DP_625", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/regime_di_potenza_massima", "entityID": "DP_670", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_vincolo_classificazione_ACI", "entityID": "DP_645", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipologia_applicazione_bollo_auto", "entityID": "DP_566", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/selettore_km", "entityID": "DP_643", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_di_veicolo_classificazione_ACI", "entityID": "DP_669", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_da_saldare", "entityID": "DP_729", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/effetto_sul_dovuto", "entityID": "DP_706", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_periodo_consegna_pratica", "entityID": "DP_687", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/recupero_somme", "entityID": "DP_618", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_risoluzione", "entityID": "DP_660", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/arrotondamento", "entityID": "DP_615", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/settore", "entityID": "DP_651", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_specialita", "entityID": "DP_700", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_complessivo_del_credito", "entityID": "DP_652", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_a_concorrenza", "entityID": "DP_586", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/percentuale_proprieta", "entityID": "DP_656", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_rinnovo_ipoteca", "entityID": "DP_732", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_finalita_iscrizione_ipoteca_o_privilegio", "entityID": "DP_757", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_pratica_motorizzazione", "entityID": "DP_693", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_totale_versato", "entityID": "DP_627", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/totale_dichiarato", "entityID": "DP_704", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#bibliographicCitation", "entityID": "DP_619", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_di_registrazione_atto", "entityID": "DP_751", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/fine_periodo", "entityID": "DP_755", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.w3.org/2003/01/geo/wgs84_pos#long", "entityID": "DP_567", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_credito", "entityID": "DP_582", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ID_formalita", "entityID": "DP_611", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipologia_destinazione_di_uso", "entityID": "DP_603", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_atto", "entityID": "DP_635", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_effetto_provvedimento", "entityID": "DP_587", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/nome_tipo_di_atto", "entityID": "DP_752", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_tipo_ultima_formalita_di_parte", "entityID": "DP_664", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_variazione_alimentazione", "entityID": "DP_741", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/consumo_combustibile", "entityID": "DP_577", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/massa_in_ordine_di_marcia", "entityID": "DP_760", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/progressivo_nel_ruolo", "entityID": "DP_569", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_versato", "entityID": "DP_647", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_trust", "entityID": "DP_570", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_intestazione", "entityID": "DP_688", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_proprieta", "entityID": "DP_714", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/coppia_massima", "entityID": "DP_599", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/toponimo", "entityID": "DP_609", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/posti_a_sedere", "entityID": "DP_698", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/combustibile", "entityID": "DP_703", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/lunghezza", "entityID": "DP_585", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/soglia", "entityID": "DP_696", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/inizio_stato_del_mondo", "entityID": "DP_717", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/opendataontology/size", "entityID": "DP_728", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#SizeOrDuration", "entityID": "DP_589", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_periodo_giacenza", "entityID": "DP_709", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.w3.org/2003/01/geo/wgs84_pos#lat", "entityID": "DP_584", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ruolo_intestatario_in_applicazione_di_bollo_auto", "entityID": "DP_737", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_consegna_al_concessionario", "entityID": "DP_649", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_anticipo", "entityID": "DP_617", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#description", "entityID": "DP_711", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_consegna_pratica", "entityID": "DP_716", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/valore_veicolo", "entityID": "DP_749", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#title", "entityID": "DP_576", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_inizio_sospensione_circolazione", "entityID": "DP_620", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_di_luogo", "entityID": "DP_655", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#abstract", "entityID": "DP_630", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/CAP", "entityID": "DP_705", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/regime_di_coppia_massima", "entityID": "DP_707", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_cilindri", "entityID": "DP_684", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_convalida_formalita", "entityID": "DP_691", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_omologazione", "entityID": "DP_594", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_tipo", "entityID": "DP_713", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_omologato", "entityID": "DP_648", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/posti_in_piedi", "entityID": "DP_672", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/revisione_entro_data", "entityID": "DP_747", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_scadenza_periodo_tributario", "entityID": "DP_756", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/serie_targa", "entityID": "DP_750", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ruolo_contribuente_in_applicazione_di_bollo_auto", "entityID": "DP_735", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_accettazione_ultima_formalita_di_parte", "entityID": "DP_600", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_dovuto", "entityID": "DP_605", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/DUG", "entityID": "DP_712", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_a_concorrenza_per_vincolo", "entityID": "DP_663", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/emissioni_co2", "entityID": "DP_661", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#issued", "entityID": "DP_606", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_rientro_in_possesso", "entityID": "DP_597", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_pratica_ACI", "entityID": "DP_742", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/massa_massima_tecnicamente_ammissibile", "entityID": "DP_646", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_Femalea_giuridica", "entityID": "DP_744", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/emolumenti", "entityID": "DP_572", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_ufficio_PRA", "entityID": "DP_727", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_pagamento", "entityID": "DP_739", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/nome_Femalea", "entityID": "DP_568", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_di_registrazione_atto", "entityID": "DP_748", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/fine", "entityID": "DP_622", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_di_possesso_di_funzionalita", "entityID": "DP_624", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/timestamp", "entityID": "DP_629", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/emolumento_ACI", "entityID": "DP_634", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/cognome_Femalea", "entityID": "DP_644", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ragione_sociale", "entityID": "DP_631", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/denominazione", "entityID": "DP_683", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_fine_sospensione", "entityID": "DP_720", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_telaio", "entityID": "DP_653", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#format", "entityID": "DP_746", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/numero_targa", "entityID": "DP_592", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/larghezza", "entityID": "DP_689", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_tipo", "entityID": "DP_718", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_quota", "entityID": "DP_598", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/trattamento_contribuente_in_applicazione_di_bollo_auto", "entityID": "DP_694", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_agevolazione_IPT", "entityID": "DP_730", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/allestimento", "entityID": "DP_743", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_perdita_di_possesso", "entityID": "DP_702", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/motivazione_sospensione", "entityID": "DP_722", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/nota_su_formalita", "entityID": "DP_685", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/anno_periodo_tributario", "entityID": "DP_715", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/importo_quota_interessi_ipoteca", "entityID": "DP_699", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#available", "entityID": "DP_666", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/congruenza_dichiarato_incassato", "entityID": "DP_628", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_motore", "entityID": "DP_632", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/cilindrata", "entityID": "DP_642", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/hp", "entityID": "DP_595", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/fine_stato_del_mondo", "entityID": "DP_679", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://dublincore.org/2012/06/14/dcterms#identifier", "entityID": "DP_601", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/fine_validita", "entityID": "DP_676", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_respingimento_formalita", "entityID": "DP_612", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/partita_IVA", "entityID": "DP_686", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_fiscale", "entityID": "DP_581", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_ID_a_fini_fiscali", "entityID": "DP_697", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_immatricolazione", "entityID": "DP_583", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/anno_formalita", "entityID": "DP_573", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/sesso", "entityID": "DP_692", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_di_nascita", "entityID": "DP_740", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_vincolo_o_gravame", "entityID": "DP_641", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/descrizione_tipo_ultima_formalita_di_parte", "entityID": "DP_731", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/peso_complessivo", "entityID": "DP_758", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_scadenza_possesso_in_applicazione_di_bollo_auto", "entityID": "DP_579", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_di_veicolo", "entityID": "DP_633", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/portata", "entityID": "DP_626", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/selettore_civico", "entityID": "DP_658", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_di_fondazione", "entityID": "DP_710", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/ravvedimento_operoso", "entityID": "DP_613", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/data_accettazione_formalita", "entityID": "DP_681", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/fuoristrada", "entityID": "DP_668", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/inizio", "entityID": "DP_623", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/dispositivo_ecologico", "entityID": "DP_596", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/codice_cdp", "entityID": "DP_719", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }, { "children": [], "entity": { "entityIRI": "http://www.aci.it/ontology/tipo_di_agevolazione", "entityID": "DP_734", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabel": null } } } }

export const classData = {
    currentEntity: {
        entityIRI: 'http://www.example.com/Person',
        entityID: 'Person',
        entityPrefixIRI: ':Person',
        entityRemainder: 'Person',
        entityLabels: [{
            lang: 'it',
            content: 'Persona'
        }],
        entityType: 'Person',
    },

    entityDiagrams: [
        {
            nodeID: 'n1223',
            diagrameName: 'Females'
        },
        {
            nodeID: 'n1843',
            diagrameName: 'Cities'
        }
    ],
    classDescriptions: [
        "Females are beautiful! YEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHH!!! YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        "Females are evil"
    ],
    equivalentClasses: [
        {
            entityIRI: 'http://www.example.com/BadFemale',
            entityID: 'BadFemale',
            entityPrefixIRI: ':BadFemale',
            entityRemainder: 'BadFemale',
            entityLabels: [{
                lang: 'it',
                content: 'BadFemalea'
            }],
            entityType: 'BadFemale',
        },
        {
            entityIRI: 'http://www.example.com/BeautifulFemale',
            entityID: 'BeautifulFemale',
            entityPrefixIRI: ':BeautifulFemale',
            entityRemainder: 'BeautifulFemale',
            entityLabels: [{
                lang: 'it',
                content: 'BeautifulFemalea'
            }],
            entityType: 'BeautifulFemale',
        }
    ],
    subClasses: [
        {
            entityIRI: 'http://www.example.com/Student',
            entityID: 'Student',
            entityPrefixIRI: ':Student',
            entityRemainder: 'Student',
            entityLabels: [{
                lang: 'it',
                content: 'Studenta'
            }],
            entityType: 'Student',
        },
        {
            entityIRI: 'http://www.example.com/Professor',
            entityID: 'Professor',
            entityPrefixIRI: ':Professor',
            entityRemainder: 'Professor',
            entityLabels: [{
                lang: 'it',
                content: 'Professora'
            }],
            entityType: 'Professor',
        }
    ],
    superClasses: [
        {
            entityIRI: 'http://www.example.com/Mammifer',
            entityID: 'Mammifer',
            entityPrefixIRI: ':Mammifer',
            entityRemainder: 'Mammifer',
            entityLabels: [{
                lang: 'it',
                content: 'Mammifera'
            }],
            entityType: 'Mammifer',
        }
    ],
    disjointClasses: [
        {
            entityIRI: 'http://www.example.com/Dog',
            entityID: 'Dog',
            entityPrefixIRI: ':Dog',
            entityRemainder: 'Dog',
            entityLabels: [{
                lang: 'it',
                content: 'Doga'
            }],
            entityType: 'Dog',
        },
        {
            entityIRI: 'http://www.example.com/Pig',
            entityID: 'Pig',
            entityPrefixIRI: ':Pig',
            entityRemainder: 'Pig',
            entityLabels: [{
                lang: 'it',
                content: 'Piga'
            }],
            entityType: 'Pig',
        }
    ],
    objectProperties: [
        {
            entityIRI: 'http://www.example.com/livesIn',
            entityID: 'livesIn',
            entityPrefixIRI: ':livesIn',
            entityRemainder: 'livesIn',
            entityLabels: [{
                lang: 'it',
                content: 'livesIna'
            }],
            entityType: 'livesIn',
        },
        {
            entityIRI: 'http://www.example.com/wasBornIn',
            entityID: 'wasBornIn',
            entityPrefixIRI: ':wasBornIn',
            entityRemainder: 'wasBornIn',
            entityLabels: [{
                lang: 'it',
                content: 'wasBornIna'
            }],
            entityType: 'wasBornIn',
        }
    ],
    dataProperties: [
        {
            entityIRI: 'http://www.example.com/yearOfBirth',
            entityID: 'yearOfBirth',
            entityPrefixIRI: ':yearOfBirth',
            entityRemainder: 'yearOfBirth',
            entityLabels: [{
                lang: 'it',
                content: 'yearOfBirtha'
            }],
            entityType: 'yearOfBirth',
        },
        {
            entityIRI: 'http://www.example.com/FemaleName',
            entityID: 'FemaleName',
            entityPrefixIRI: ':FemaleName',
            entityRemainder: 'FemaleName',
            entityLabels: [{
                lang: 'it',
                content: 'FemaleNamea'
            }],
            entityType: 'FemaleName',
        }
    ],
    disjointUnions: [
        [
            {
                entityIRI: 'http://www.example.com/Male',
                entityID: 'Male',
                entityPrefixIRI: ':Male',
                entityRemainder: 'Male',
                entityLabels: [{
                    lang: 'it',
                    content: 'Malea'
                }],
                entityType: 'Male',
            },
            {
                entityIRI: 'http://www.example.com/Female',
                entityID: 'Female',
                entityPrefixIRI: ':Female',
                entityRemainder: 'Female',
                entityLabels: [{
                    lang: 'it',
                    content: 'Femalea'
                }],
                entityType: 'Female',
            }
        ],
        [
            {
                entityIRI: 'http://www.example.com/Student',
                entityID: 'Student',
                entityPrefixIRI: ':Student',
                entityRemainder: 'Student',
                entityLabels: [{
                    lang: 'it',
                    content: 'Studenta'
                }],
                entityType: 'Student',
            },
            {
                entityIRI: 'http://www.example.com/Professor',
                entityID: 'Professor',
                entityPrefixIRI: ':Professor',
                entityRemainder: 'Professor',
                entityLabels: [{
                    lang: 'it',
                    content: 'Professora'
                }],
                entityType: 'Professor',
            }
        ]
    ],
    classIndividuals: [
        {
            entityIRI: 'http://www.example.com/Valerio',
            entityID: 'Valerio',
            entityPrefixIRI: ':Valerio',
            entityRemainder: 'Valerio',
            entityLabels: [{
                lang: 'it',
                content: 'Valerioa'
            }],
            entityType: 'Valerio',
        },
        {
            entityIRI: 'http://www.example.com/Marco',
            entityID: 'Marco',
            entityPrefixIRI: ':Marco',
            entityRemainder: 'Marco',
            entityLabels: [{
                lang: 'it',
                content: 'Marcoa'
            }],
            entityType: 'Marco',
        }
    ]
}

export const mappings = {
    mappingList: [

        {
            "mappingID": "MAPPING_1",
            "mappingDescription": "Wonderful mappings",
            "mappingDate": "25/12/0",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 34,
            "numInclusionDependencies": 34,
            "numDenials": 34,
        },
        {
            "mappingID": "MAPPING_2",
            "mappingDescription": "Added some dependencies",
            "mappingDate": "25/12/0122",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 12122134,
            "numInclusionDependencies": 3212124,
            "numDenials": 312124,
        },

    ]
}

export const mappingInfo =
{
    mapping: {
        "mappingID": "MAPPING 1",
        "mappingDescription": "Wonderful mappings",
        "mappingDate": "25/12/0",
        "numAssertions": 20,
        "numViews": 23,
        "numKeyDependencies": 34,
        "numInclusionDependencies": 34,
        "numDenials": 34,
    },
    mappingDBConnections: [{
        jdbcURL: 'jdbc:mysql://localhost/books',
        dbUser: 'root',
        dbPassword: '........'
    }],
    mappingTemplates: [
        'http://www.obdasystems.com/books/q-{_}',
        'http://www.obdasystems.com/books/s-{_}',
        'http://www.obdasystems.com/books/s-{_}',
        'http://www.obdasystems.com/books/d-{_}',
    ]
}

export const assertions =
    [
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/person_{ssn}',
            },
            mappingDescription: 'Data from main table',
            mappingBody: {
                bodySelect: 'ssn',
                bodyWhere: 'ssn is not null',
                bodyFrom: [
                    {
                        sqlViewID: 'personsView',
                        sqlViewDescription: 'Main table for persons',
                        sqlViewCode: 'select ssn, birthDate, livesIn from persona_table'
                    }
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        }
    ]

export const sqlView =
{
    sqlView: {
        sqlViewID: 'namesView',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    mappingAssertions: [
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Name',
                entityID: 'Name',
                entityPrefixIRI: ':Name',
                entityRemainder: 'Name',
                entityLabels: [{
                    lang: 'it',
                    content: 'Nome'
                }],
                entityType: 'dataProperty',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
                secondArg: 'person_name'
            },
            mappingDescription: 'Data from names table',
            mappingBody: {
                bodySelect: 'person_name',
                bodyWhere: 'person_name is not null',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                ]
            }
        }
    ],
    mappingDependencies: {
        keyDependencies: [
            {
                keyHead: 'person_id',
                sqlViewID: 'namesView'
            }
        ],
        inclusionDependencies: [
            {
                includedView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includingView: {
                    sqlViewID: 'surnamesView',
                    termsList: ['person_id', 'person_surname']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'person_id'
                    }
                ]
            },
            {
                includingView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includedView: {
                    sqlViewID: 'surnamesView',
                    termsList: ['person_id', 'person_surname']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'person_id'
                    }
                ]
            },
            {
                includedView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includingView: {
                    sqlViewID: 'allTheWorldView',
                    termsList: ['names', 'ids']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_name',
                        rightHandTerm: 'names'
                    },
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'ids'
                    }
                ]
            }
        ],
        denials: [
            'SELECT * FROM namesView, courseNamesView WHERE person_name = course_name',
            'SELECT * FROM namesView, cityNamesView WHERE person_name = city_name',
        ]
    }
}

export const sqlViews = [
    {
        sqlViewID: 'namesView',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView1',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView2',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView3',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView4',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'longNameViewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
]

export const queryCatalog = [
    {
        queryID: 'q1',
        queryDescription: 'Take all the cars',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Car }'
    },
    {
        queryID: 'q2',
        queryDescription: 'Take all the bars',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Bar }'
    },
    {
        queryID: 'q3',
        queryDescription: 'Take all the zars',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Zar }'
    }
]

