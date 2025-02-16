// ==================== 通用工具函数 ====================

import { DataCell } from '../../../cell/data-cell';

// 1. 创建蒙版层
const createPreviewOverlay = (): HTMLDivElement => {
  const overlay = document.createElement('div');

  Object.assign(overlay.style, {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: '9999',
    cursor: 'pointer',
  });

  return overlay;
};

// 2. 通用媒体容器样式
const applyMediaContainerStyle = (element: HTMLElement) => {
  Object.assign(element.style, {
    maxWidth: '80%',
    maxHeight: '80%',
    objectFit: 'contain',
  });
};

// ==================== 工厂函数 ====================
const createImageElement = (src: string): HTMLImageElement => {
  const img = new Image();

  img.src = src;
  applyMediaContainerStyle(img);
  img.alt = 'preview';

  return img;
};

const createVideoElement = (src: string): HTMLVideoElement => {
  const video = document.createElement('video');

  video.src = src;
  applyMediaContainerStyle(video);
  video.controls = true;
  video.preload = 'auto';
  // 移动端适配
  video.playsInline = true;

  return video;
};

// ==================== 主逻辑 ====================
export const bindMediaClick = (cell: DataCell) => {
  const renderer = cell.getRenderer()!;
  const { type } = renderer;
  const src = cell.getFieldValue()!.toString();

  // 1. 类型安全检查
  if (renderer!.clickToPreview === false) {
    return;
  }

  // 2. 创建蒙版
  const overlay = createPreviewOverlay();

  // 3. 创建媒体元素
  const mediaElement =
    type === 'image' ? createImageElement(src) : createVideoElement(src);

  // 4. 事件处理
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      mediaElement.remove();
      overlay.removeEventListener('click', handleOverlayClick);
    }
  };

  overlay.addEventListener('click', handleOverlayClick);
  overlay.appendChild(mediaElement);
  document.body.appendChild(overlay);
};
