import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmDialogPropps {
  title: string;
  children: React.ReactNode;
  open: boolean
  setOpen: (event: any) => void;
  onConfirm: any;
}


const ConfirmDialog = (props: ConfirmDialogPropps) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
          }}
          color="secondary"
        >
          Não
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="inherit"
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;