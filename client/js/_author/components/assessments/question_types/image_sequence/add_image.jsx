import React             from 'react';
import { connect }       from 'react-redux';

import guid              from '../../../../../utils/guid';
import * as AssetActions from '../../../../../actions/qbank/assets';
import UploadModal       from '../../../common/upload_modal/editor_upload_modal';
import localize          from '../../../../locales/localize';

function select(state) {
  return {
    loadingMedia: state.media.loading,
    images: state.media.image,
  };
}

export class AddImage extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
    }),
    loadingMedia: React.PropTypes.bool,
    uploadMedia: React.PropTypes.func.isRequired,
    addMediaToQuestion: React.PropTypes.func,
    images: React.PropTypes.shape({}),
    localizeStrings:  React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      mediaGuid: null,
      modal: false,
    };
  }

  getImageFile() {
    return (
      <div>
        <input
          onChange={e => this.uploadMedia(e.target.files[0])}
          id={`newImageId-${this.props.item.id}`}
          type="file"
        />
        <label htmlFor={`newImageId-${this.props.item.id}`}>
          <i className="material-icons">find_in_page</i>
        </label>
      </div>
    );
  }

  uploadMedia(file, metadata, newMedia) {
    this.setState({ modal: false });
    const mediaGuid = guid();

    this.props.addMediaToQuestion(
      file,
      mediaGuid,
      this.props.item.bankId,
      this.props.item.id,
      'question.choices.new',
      metadata,
      newMedia
    );
  }

  render() {
    const strings = this.props.localizeStrings('addImage');
    return (
      <div className="au-c-image-sequence-answer-add">
        <button
          className="au-c-image-sequence-answer-add__button"
          onClick={() => this.setState({ modal: true })}
        >
          <UploadModal
            isOpen={this.state.modal}
            id={this.props.item.id}
            closeModal={() => this.setState({ modal: false })}
            mediaType="img"
            mediaName=""
            media={this.props.images}
            loading={this.props.loadingMedia}
            insertMedia={(media, metaData, newMedia) => this.uploadMedia(media, metaData, newMedia)}
            inProgress={false}
            error={null}
          />
          {strings.addImage}
        </button>
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(AddImage));
