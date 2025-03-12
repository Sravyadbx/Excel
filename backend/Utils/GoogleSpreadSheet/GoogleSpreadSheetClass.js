class GoogleSpreadSheetClass{

    static currSpreadSheetId;
    static currReadFileData;

    static setCurrSpreadSheetID=(sheetId)=>{
        this.currSpreadSheetId=sheetId;
    }

    static setCurrReadFileData=(csvData)=>{
        this.currReadFileData=csvData;
    }


}


export{GoogleSpreadSheetClass};