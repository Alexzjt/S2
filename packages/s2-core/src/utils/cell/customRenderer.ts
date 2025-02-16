import { HTML, Image } from '@antv/g';
import { CellClipBox } from '../../common/interface/basic';
import { S2CellType } from '../../common/interface/interaction';
import { CustomRendererConfig } from '../../common/interface/renderer';

export function drawCustomRenderer(
  renderer: CustomRendererConfig,
  cell: S2CellType,
) {
  const text = cell.getFieldValue()!.toString();
  const { x, y, height } = cell.getBBoxByType(CellClipBox.CONTENT_BOX);
  const config = renderer.config || {};

  if (!config.height && !config.width) {
    config.height = height;
  }

  let element;

  switch (renderer.type) {
    case 'image': {
      element = new Image({
        style: {
          x,
          y,
          keepAspectRatio: true,
          src: text,
          ...config,
        },
      });
      break;
    }
    case 'video': {
      const video = document.createElement('video');

      Object.assign(video, config);
      element = new HTML({
        style: {
          x,
          y,
          innerHTML: video,
          pointerEvents: 'auto',
        },
      });
      break;
    }
    case 'html': {
      element = new HTML({
        style: {
          x,
          y,
          innerHTML: text,
          pointerEvents: 'auto',
          ...config,
        },
      });
      break;
    }
    default:
  }
  if (element) {
    cell.appendChild(element);
  }
}
