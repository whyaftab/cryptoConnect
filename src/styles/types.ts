/**
 * Types
 */

import { DefaultTheme } from 'styled-components/native';

export type Mode = 'light' | 'dark';

export type TextColors = keyof Omit<DefaultTheme['colors'], 'shadow'>;

/**
 * State
 */

export interface SettingsState {
    mode: Mode;
  }
  
  export type ContainerState = SettingsState;
  