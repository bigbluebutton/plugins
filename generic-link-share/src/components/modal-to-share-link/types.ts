export interface ModalToShareLinkProps {
    showModal: boolean;
    handleCloseModal: () => void;
    linkError: string;
    setLinkError: React.Dispatch<React.SetStateAction<string>>;
    handleSendLinkToIframe: (e: React.SyntheticEvent) => void;
    isUrlSameForRole: boolean;
    handleCheckboxChange: () => void
}
