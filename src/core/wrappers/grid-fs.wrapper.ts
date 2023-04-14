import mongoose from 'mongoose';
import fs from 'fs';



class GridFSWrapper {

    /**
     * @description Add New File To mongo GridFS Store...
     * @param {String} filePath uploaded File parth
     * @param {ObjectId} ObjectId primary key
     * @param {String} fileName File name
     * @param {chunkSizeBytes:null,metadata:null,contentType:null,aliases:null,disableMD5:false} options
     */
    private putFile(filePath:fs.PathLike, ObjectId :mongoose.Types.ObjectId , fileName :string, options:mongoose.mongo.GridFSBucketWriteStreamOptions): mongoose.mongo.GridFSBucketWriteStream {
        const dbObj = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(dbObj);
      
        return fs.createReadStream(filePath).pipe(bucket.openUploadStreamWithId(ObjectId, fileName, options));
    };

    private async findOne(filter : mongoose.mongo.Filter<mongoose.mongo.BSON.Document>): Promise<Promise<any | null>> {
        try{
            const dbObj = mongoose.connection.db;
            return await dbObj.collection('fs.files').findOne(filter);
        }catch(ex){
            console.log(ex);
            return null;
        }
    };

    private async deleteFile(objectID:mongoose.Types.ObjectId):Promise<void>{
        try{
            const dbObj = mongoose.connection.db;
            const bucket = new mongoose.mongo.GridFSBucket(dbObj);
            return await bucket.delete(objectID);
        }catch(ex){
            console.log(ex);
            return null;
        }
    };

    public sendFileToResponse(id:mongoose.Types.ObjectId, res:NodeJS.WritableStream): NodeJS.WritableStream {
        const dbObj = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(dbObj);
      
        return bucket.openDownloadStream(id).pipe(res);
    };

    public async getFile(objectId: mongoose.Types.ObjectId ): Promise<Promise<any | null>> {
        return await this.findOne({ _id: objectId });
    };

    public async removeExistingFile(objectId: mongoose.Types.ObjectId):Promise<void>{
        const file = await this.getFile(objectId);
        if (file) await this.deleteFile(objectId);
    };

    public async uploadImage(objectId:mongoose.Types.ObjectId, file:Express.Multer.File): Promise<boolean> {
        try{
            if (file) {
                await this.removeExistingFile(objectId);
                await this.putFile(file.path,objectId,file.originalname,{ contentType: file.mimetype });
                return true;
            } else {
                return false;
            }
        }catch(ex){
            console.log(ex);
            return false;
        }
    }
}

export default new GridFSWrapper();