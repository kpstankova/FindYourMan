import React from 'react';
import Dropzone, { ILayoutProps, IFileWithMeta, IPreviewProps } from 'react-dropzone-uploader';
import './profile-image-uploader.styles.scss';
import Image from 'react-async-image';
import { ProfileImageUploaderProps } from './onboarding.types';
import { StoreState } from '../../redux/root-reducer';
import { DroppedFile, OnboardingActionTypes } from '../../redux/onboarding/onboarding.types';
import { selectProfileImage } from '../../redux/onboarding/onboarding.selectors';
import { IAddProfileImage, TOnboardingReducerAction } from '../../redux/onboarding/onboarding.actions';
import { connect } from 'react-redux';
import { Dispatch } from "redux";

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ ...props }) => {
    const { profileImage, addProfileImageAction } = props;
    const dropzoneLabel = "Upload profile picture"
    const urls = new WeakMap();

    const getBlobUrl = (blob: File) => {
        if (urls.has(blob)) {
            return urls.get(blob)
        }
        else {
            let url = URL.createObjectURL(blob)
            urls.set(blob, url)
            return url
        }
    }

    const Layout = ({ input, submitButton, previews, dropzoneProps, files }: ILayoutProps) => {
        return (
            <div className='dropzone-container'>
                {previews !== null && previews.length === 0 ?
                    <div {...dropzoneProps} className='dropzone-label'>
                        {input}
                    </div>
                    :
                    null
                }
                <div className='preview-container'>
                    {previews && previews.length > 0
                        ?
                        previews
                        :
                        (profileImage && profileImage.fileWithMeta ?
                            <div className="preview-box">
                                <Image src={getBlobUrl(profileImage.fileWithMeta.file)} className="image"
                                    loading='auto' placeholder={<div className="placeholder">Failed to load profile image</div>}
                                />
                            </div>
                            : null)
                    }
                </div>
                {files.length > 0 && submitButton}
            </div>
        )
    }

    const Preview = ({ fileWithMeta }: IPreviewProps) => {

        return (
            <div className="preview-box">
                <Image src={getBlobUrl(fileWithMeta.file)} className="image"
                    loading='auto' placeholder={<div className="placeholder">Failed to display</div>}
                />
            </div>
        )
    }

    const onChangeStatus = (file: IFileWithMeta, status: any) => {
        if (status === 'done') {
            let droppedFile: DroppedFile = {
                fileWithMeta: file,
                fileObject: file.file.name
            };
            addProfileImageAction(droppedFile);
        }
    }

    return (
        <Dropzone
            accept="image/*"
            LayoutComponent={Layout}
            onChangeStatus={onChangeStatus}
            PreviewComponent={Preview}
            inputContent={dropzoneLabel}
            maxFiles={1}
            multiple={false}
            canCancel={false}
            classNames={{
                dropzone: 'dropzone-container',
                inputLabel: 'dropzone-inputLabel'
            }}
        />
    );
};

const mapStateToProps = (state: StoreState): { profileImage: DroppedFile | null } => {
    return {
        profileImage: selectProfileImage(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TOnboardingReducerAction>) => {
    return {
        addProfileImageAction: (data: any) => dispatch<IAddProfileImage>({ type: OnboardingActionTypes.ADD_PROFILE_IMAGE, data: data })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageUploader);