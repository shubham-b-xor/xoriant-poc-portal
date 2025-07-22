import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Button,
    Link,
    TextField,
    Collapse,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { closePOCModal } from '../features/pocs/pocSlice';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
};

const POCModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const poc = useSelector((state: RootState) => state.pocs.selectedPOC);
    console.log('Selected POC in modal:', poc);
    const [comments, setComments] = useState<Record<string, any[]>>({});

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        email: '',
        comment: '',
    });

    const handleClose = () => dispatch(closePOCModal());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        if (!poc) return;

        const newComment = { ...formData, createdAt: new Date().toISOString() };

        setComments((prev) => ({
            ...prev,
            [poc._id]: [...(prev[poc._id] || []), newComment],
        }));

        setShowForm(false);
        setFormData({ name: '', designation: '', email: '', comment: '' });
    };



    if (!poc) return null;

    return (
        <Modal open={!!poc} onClose={handleClose} aria-labelledby="poc-modal-title">
            <Box sx={style}>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    aria-label="Close"
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                        src={poc.logoUrl}
                        alt={`${poc.name} logo`}
                        sx={{ width: 64, height: 64, borderRadius: 2 }}
                        variant="rounded"
                    />
                    <Typography id="poc-modal-title" variant="h5">
                        {poc.name}
                    </Typography>
                </Box>

                <Typography sx={{ mb: 3 }}>{poc.description}</Typography>

                <Typography variant="h6" gutterBottom>
                    Contributors
                </Typography>
                <List dense>
                    {poc.contributors.map((c, idx) => (
                        <ListItem key={idx} secondaryAction={
                            <Link href={`mailto:${c.email}`} aria-label={`Email ${c.name}`}>
                                <EmailIcon />
                            </Link>
                        }>
                            <ListItemAvatar>
                                <Avatar>{c.name.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={c.name} secondary={`${c.designation} — ${c.email}`} />
                        </ListItem>
                    ))}
                </List>

                {/* Add Comment Button */}
                <Box sx={{ mt: 3 }}>
                    {!showForm && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowForm(true)}
                            sx={{ textTransform: 'none' }}
                        >
                            Add Comment
                        </Button>
                    )}
                </Box>

                {/* Comment Form */}
                <Collapse in={showForm}>
                    <Stack spacing={2} mt={2}>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Designation"
                            name="designation"
                            fullWidth
                            value={formData.designation}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Comment"
                            name="comment"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.comment}
                            onChange={handleChange}
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="text" onClick={() => setShowForm(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Stack>
                </Collapse>

                {/* Visit POC Button */}
                <Box sx={{ mt: 4, textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => window.open(poc.url, '_blank')}
                        sx={{ textTransform: 'none' }}
                    >
                        Visit POC
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default POCModal;
