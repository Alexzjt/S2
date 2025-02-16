import { HTMLStyleProps, ImageStyleProps } from '@antv/g';

// 基础渲染配置
interface BaseRendererConfig {
  /**
   * 渲染类型
   * @default 'text' (兼容原有 formatter)
   */
  type: 'image' | 'video' | 'html';
  /** 当渲染失败时的回退内容（文字/HTML） */
  fallback?: string;
  /** 是否开启点击预览 */
  clickToPreview: boolean;
}

// 图片渲染配置
export interface ImageRendererConfig extends BaseRendererConfig {
  type: 'image';
  config?: Partial<ImageStyleProps>;
}

// 视频渲染配置
export interface VideoRendererConfig extends BaseRendererConfig {
  type: 'video';
  config?: Partial<HTMLVideoElement>;
}

// HTML渲染配置
export interface HTMLRendererConfig extends BaseRendererConfig {
  type: 'html';
  config?: HTMLStyleProps;
}

export type CustomRendererConfig =
  | ImageRendererConfig
  | VideoRendererConfig
  | HTMLRendererConfig;
