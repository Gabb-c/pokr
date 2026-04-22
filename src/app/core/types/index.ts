export type DeckType = 'fibonacci' | 'tshirt' | 'powers-of-two';

export interface Participant {
  id: string;
  name: string;
  vote: string | null;
  isSpectator: boolean;
}

export interface Room {
  id: string;
  name: string;
  deckType: DeckType;
  participants: Record<string, Participant>;
  status: 'voting' | 'revealed';
  createdAt: number;
}
