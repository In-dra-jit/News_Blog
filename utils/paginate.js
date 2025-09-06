const { hash } = require("bcryptjs");

const paginate=async (model,query={},reqQuery={},option={}) => {

    const{page=1,limit=3,sort='-createdAt'}=reqQuery;
    const paginationOption={
        page:parseInt(page),
        limit:parseInt(limit),
        sort,
        ...option
    }
    try {
        const result=await model.paginate(query,paginationOption);
        return {
            data:result.docs,
            meta:{
              
                lastPage:result.lastPage,
                hasPrevPage:result.hasPrevPage,
                hasNextPage:result.hasNextPage,
                prevPage:result.prevPage,
                nextPage:result.nextPage,
                currentPage:result.page,
                Counter:result.pagingCounter,
                limit:result.limit,
                totalDocs:result.totalDocs,
                totalPages:result.totalPages
            }
        };
    } catch (error) {
        console.log(error);
        return error;
    }
    

}
module.exports=paginate;