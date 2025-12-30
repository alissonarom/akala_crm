import React, { useState } from 'react';
import { Box, Fab, Paper, Typography, TextField, IconButton, Avatar } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
        { role: 'model', content: 'Olá! Sou a Nova, sua assistente de inteligência artificial. Como posso ajudar seu restaurante hoje?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user' as const, content: input }];
        setMessages(newMessages);
        setInput('');

        // Mock response for now
        setTimeout(() => {
            setMessages([...newMessages, {
                role: 'model',
                content: `
                    Alcance alto, conversão fraca

                    Apesar do volume expressivo de visualizações, a campanha performou abaixo do padrão histórico, evidenciando falha clara na oferta ou no CTA.

                    Próximos passos
                    - Escalar apenas para Super Fans
                    - Validar oferta direta com desconto fixo
                    - Simplificar copy e usar CTA mais direto e urgente
                    `

            }]);
        }, 1000);
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <Paper
                        component={motion.div}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        elevation={10}
                        sx={{
                            position: 'fixed',
                            bottom: 100,
                            right: 32,
                            width: 350,
                            height: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 4,
                            overflow: 'hidden',
                            zIndex: 1300,
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ p: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                                    <AutoAwesomeIcon />
                                </Avatar>
                                <Typography variant="subtitle1" fontWeight="bold" color="white">Nova AI</Typography>
                            </Box>
                            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Messages */}
                        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        bgcolor: msg.role === 'user' ? 'primary.main' : 'rgba(255,255,255,0.05)',
                                        color: msg.role === 'user' ? 'white' : 'text.primary',
                                        p: 1.5,
                                        borderRadius: 2,
                                        maxWidth: '80%',
                                        borderBottomRightRadius: msg.role === 'user' ? 0 : 2,
                                        borderBottomLeftRadius: msg.role === 'model' ? 0 : 2,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    <Typography variant="body2">{msg.content}</Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Input */}
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Digite sua mensagem..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <IconButton color="primary" onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                )}
            </AnimatePresence>

            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => setOpen(!open)}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1300,
                }}
            >
                {open ? <CloseIcon /> : <AutoAwesomeIcon />}
            </Fab>
        </>
    );
};

export default Chatbot;
