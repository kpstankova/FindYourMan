import multer from 'multer';
import fs from 'fs-extra';
import filesRouter from '../routers/filesRouter';

const profilePicFolder = '../images/profilePics';
const servicePicFolder = '../images/servicePics';

const createProfileFolder = async (folderName: any, isProfile: boolean) => {
    const folderPath = (isProfile == true ? profilePicFolder : servicePicFolder) + '/' + folderName; 
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, {recursive: true});
    }
}

const moveFiles = async (fileName: string, isProfile: boolean, to: any) => {
    if (isProfile === true && !fs.existsSync(profilePicFolder + '/' + to + '/' + fileName)) {
        await fs.emptyDir(profilePicFolder + '/' + to + '/');
        await fs.move('../images/' + fileName, profilePicFolder + '/' + to + '/' + fileName);
        return profilePicFolder + '/' + to + '/' + fileName;
    } else if (isProfile === true && fs.existsSync(profilePicFolder + '/' + to + '/' + fileName)) {
        await fs.rm('../images/' + fileName);
        return profilePicFolder + '/' + to + '/' + fileName;
    } else if(isProfile === false && !fs.existsSync(servicePicFolder + '/' + to + '/' + fileName)) {
        await fs.emptyDir(servicePicFolder + '/' + to + '/');
        await fs.move('../images/' + fileName, servicePicFolder + '/' + to + '/' + fileName);
        return servicePicFolder + '/' + to + '/' + fileName;
    } else if (isProfile === false && fs.existsSync(servicePicFolder + '/' + to + '/' + fileName)) {
        await fs.rm('../images/' + fileName);
        return servicePicFolder + '/' + to + '/' + fileName;
    }
    return "File already exists";
}

export { createProfileFolder, moveFiles }