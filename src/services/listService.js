const listService= async (req,dataModel,searchArray) => {
    try{

        let pageNo = Number(req.params.pageNo);
        console.log(pageNo);
        let perPage = Number(req.params.perPage);
        console.log(perPage);
        let searchValue = req.params.searchKeyword;
        console.log("search value is",  searchValue);
        let email=req.headers['email'];
        console.log(email);

        let skipRow = (pageNo - 1) * perPage;
        console.log(skipRow);

        let data;

        if (Number(searchValue)!== 0) {
            console.log("ishan");
            let searchQuery = {$or:searchArray}
            data = await dataModel.aggregate([
                {$match: searchQuery},
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ]);
        }
        else {
            data = await dataModel.aggregate([
                {$match: {email:email}},
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])
        }
        console.log(`data is `,data.length);
        return {status: "success", data: data};
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=listService;