import React from 'react';
import Dropzone, { ILayoutProps, IFileWithMeta, IPreviewProps } from 'react-dropzone-uploader';
import '../onboarding/profile-image-uploader.styles.scss';
import Image from 'react-async-image';
import { StoreState } from '../../redux/root-reducer';
import { DroppedFile } from '../../redux/onboarding/onboarding.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ServiceImageUploaderprops } from './my-services.types';
import { selectServiceImage } from '../../redux/services/services.selectors';
import { IAddServiceImage, TServicesReducerAction } from '../../redux/services/services.actions';
import { ServicesActionTypes } from '../../redux/services/services.types';

const ServiceImageUploader: React.FC<ServiceImageUploaderprops> = ({ ...props }) => {
    const { serviceImage, addServiceImageAction } = props;
    const dropzoneLabel = "Add images"
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
                        (serviceImage && serviceImage.fileWithMeta ?
                            <div className="preview-box">
                                <Image src={getBlobUrl(serviceImage.fileWithMeta.file)} className="image"
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
            addServiceImageAction(droppedFile);
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
            canCancel={true}
            classNames={{
                dropzone: 'dropzone-container',
                inputLabel: 'dropzone-inputLabel'
            }}
        />
    );
};

const mapStateToProps = (state: StoreState): { serviceImage: DroppedFile | null } => {
    return {
        serviceImage: selectServiceImage(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TServicesReducerAction>) => {
    return {
        addServiceImageAction: (data: any) => dispatch<IAddServiceImage>({ type: ServicesActionTypes.ADD_SERVICE_IMAGE, data: data })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceImageUploader);