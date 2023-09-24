import type { TilesActionLayoutChange } from './layoutChange';
import type { TilesActionPanelClose } from './panelClose';
import type { TilesActionPanelCollapse } from './panelCollapse';
import type { TilesActionPanelFullScreen } from './panelFullScreen';
import type { TilesActionPanelSplit } from './panelSplit';
import type { TilesActionTabChangeId } from './tabChangeId';
import type { TilesActionTabClose } from './tabClose';
import type { TilesActionTabDrop } from './tabDrop';
import type { TilesActionTabOpen } from './tabOpen';
import type { TilesActionTabSetActive } from './tabSetActive';

export type TilesAction =
  | TilesActionLayoutChange
  | TilesActionPanelClose
  | TilesActionPanelCollapse
  | TilesActionPanelFullScreen
  | TilesActionPanelSplit
  | TilesActionTabChangeId
  | TilesActionTabClose
  | TilesActionTabDrop
  | TilesActionTabOpen
  | TilesActionTabSetActive;
