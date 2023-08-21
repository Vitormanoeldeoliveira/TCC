export const UpdatePlantations = (props) => {
    const {openModal, setOpenModal} = props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(openModal.modalUpdateUser) {
            setOpen(true);
        }
    }, [openModal.modalUpdateUser]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalUpdateUser: false
            })
        }, 1000);
      };
}