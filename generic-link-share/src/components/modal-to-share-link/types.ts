import { DataToGenericLink } from '../generic-link-share/types';

export interface ModalToShareLinkProps {
    previousModalState: DataToGenericLink;
    setPreviousModalState: React.Dispatch<React.SetStateAction<DataToGenericLink>>;
    showModal: boolean;
    handleCloseModal: () => void;
    linkError: string;
    setLinkError: React.Dispatch<React.SetStateAction<string>>;
    handleSendLinkToIframe: (e: React.SyntheticEvent) => void;
    handleCheckboxChange: () => void
}
