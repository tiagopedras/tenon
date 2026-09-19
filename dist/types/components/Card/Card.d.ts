import { HTMLAttributes } from 'react';
export type CardElevation = 'flat' | 'raised' | 'overlay';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    elevation?: CardElevation;
    padding?: CardPadding;
    /** Adds the hover and focus treatment. Give it an onClick and a role too. */
    interactive?: boolean;
}
export declare const Card: import('react').ForwardRefExoticComponent<CardProps & import('react').RefAttributes<HTMLDivElement>>;
