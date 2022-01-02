import multer from 'multer';
import fs from 'fs-extra';

const profilePicFolder = '../images/profilePics';
const servicePicFolder = '../images/servicePics';

const createProfileFolder = async (folderName: string, isProfile: boolean) => {
    const folderPath = (isProfile == true ? profilePicFolder : servicePicFolder) + '/' + folderName; 
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, {recursive: true});
    }
}

export { createProfileFolder }