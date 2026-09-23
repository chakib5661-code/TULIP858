import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  Info,
  X,
  Bot,
  FileText,
  UserCheck,
  Package,
  Layers,
  ArrowRight,
  Sliders,
  Copy,
} from 'lucide-react';
import { StoreSettings } from '../types';
import {
  fetchTelegramStatus,
  triggerTelegramTest,
  saveTelegramSettings,
  TelegramStatusResponse,
} from '../utils/api';

interface AdminTelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeSettings: StoreSettings;
  onUpdateSettings?: (newSettings: StoreSettings) => void;
}

export const AdminTelegramModal: React.FC<AdminTelegramModalProps> = ({
  isOpen,
  onClose,
  storeSettings,
  onUpdateSettings,
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TelegramStatusResponse | null>(null);

  // Dedicated Chat IDs for each notification type as requested:
  const [preorderChatId, setPreorderChatId] = useState(storeSettings.telegramPreorderChatId || '');
  const [proformaChatId, setProformaChatId] = useState(storeSettings.telegramProformaChatId || '');
  const [accessChatId, setAccessChatId] = useState(storeSettings.telegramAccessChatId || '');
  const [generalChatId, setGeneralChatId] = useState(storeSettings.telegramChatId || '');

  const [botToken, setBotToken] = useState(
    storeSettings.telegramBotToken || '8908435035:AAFYIq74hxJeFeiQAPRx_g_WZ7R5fL0uwu8'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    storeSettings.telegramNotificationsEnabled !== false
  );

  const [testingChannel, setTestingChannel] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    channel?: string;
    message: string;
  } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAdvancedToken, setShowAdvancedToken] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchTelegramStatus();
      setStatus(res);
      if (res.preorderChatId && !preorderChatId) setPreorderChatId(res.preorderChatId);
      if (res.proformaChatId && !proformaChatId) setProformaChatId(res.proformaChatId);
      if (res.accessChatId && !accessChatId) setAccessChatId(res.accessChatId);
      if (res.chatId && !generalChatId) setGeneralChatId(res.chatId);
    } catch (err) {
      console.error('Error fetching Telegram status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPreorderChatId(storeSettings.telegramPreorderChatId || '');
      setProformaChatId(storeSettings.telegramProformaChatId || '');
      setAccessChatId(storeSettings.telegramAccessChatId || '');
      setGeneralChatId(storeSettings.telegramChatId || '');
      setBotToken(storeSettings.telegramBotToken || '8908435035:AAFYIq74hxJeFeiQAPRx_g_WZ7R5fL0uwu8');
      setNotificationsEnabled(storeSettings.telegramNotificationsEnabled !== false);
      loadStatus();
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen, storeSettings]);

  if (!isOpen) return null;

  const handleTestChannel = async (
    channelType: 'preorder' | 'proforma' | 'access' | 'general',
    targetChatId: string
  ) => {
    setTestingChannel(channelType);
    setTestResult(null);
    try {
      const effectiveChatId = targetChatId.trim() || generalChatId.trim();
      const res = await triggerTelegramTest(effectiveChatId, botToken, channelType);
      if (res.success) {
        setTestResult({
          success: true,
          channel: channelType,
          message: res.message || 'Notification test reçue avec succès sur Telegram !',
        });
      } else {
        setTestResult({
          success: false,
          channel: channelType,
          message: res.error || "Échec de l'envoi du test sur ce canal.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        channel: channelType,
        message: err.message || 'Erreur réseau.',
      });
    } finally {
      setTestingChannel(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);
    try {
      const newSettingsPayload = {
        telegramChatId: generalChatId.trim(),
        telegramPreorderChatId: preorderChatId.trim(),
        telegramProformaChatId: proformaChatId.trim(),
        telegramAccessChatId: accessChatId.trim(),
        telegramBotToken: botToken.trim(),
        telegramNotificationsEnabled: notificationsEnabled,
      };

      const res = await saveTelegramSettings(newSettingsPayload);
      if (res.success) {
        setSaveSuccess(true);
        if (onUpdateSettings) {
          onUpdateSettings({
            ...storeSettings,
            ...newSettingsPayload,
          });
        }
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const assignChatToChannel = (chatId: string, channel: 'preorder' | 'proforma' | 'access' | 'general') => {
    if (channel === 'preorder') setPreorderChatId(chatId);
    else if (channel === 'proforma') setProformaChatId(chatId);
    else if (channel === 'access') setAccessChatId(chatId);
    else if (channel === 'general') setGeneralChatId(chatId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Routage des Notifications Telegram
                </h3>
                {status?.bot ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Bot En Ligne
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-semibold border border-amber-500/30">
                    Connexion...
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Acheminez les précommandes, proformas et demandes d&apos;accès vers différents canaux / groupes Telegram
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Bot Identity Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{status?.bot?.first_name || 'Tulip Fragrance Bot'}</span>
                  <span className="text-xs font-mono text-sky-400">@{status?.bot?.username || 'tulip5661bot'}</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>ID : {status?.bot?.id || '8908435035'}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Actif pour alertes automatiques</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={loadStatus}
                disabled={loading}
                className="px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Rafraîchir la détection des groupes"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              <a
                href={`https://t.me/${status?.bot?.username || 'tulip5661bot'}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              >
                <span>Ouvrir Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Master Enable/Disable Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">
                Notifications Automatiques Telegram
              </span>
              <span className="text-[11px] text-slate-400 block">
                Envoyer chaque événement en temps réel vers les canaux correspondants ci-dessous
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                notificationsEnabled ? 'bg-sky-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3 Dedicated Channels Configuration */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Configuration des Destinataires par Type d&apos;Événement :
            </div>

            {/* CHANNEL 1: PREORDERS */}
            <div className="p-4 rounded-2xl bg-slate-850 border border-pink-500/30 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold text-sm">
                    🌸
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      1. Précommandes Fermes (Commandes Standard)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Reçoit chaque nouvelle commande passée par les clients (PDF, quantités, wilaya)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTestChannel('preorder', preorderChatId)}
                  disabled={testingChannel !== null}
                  className="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Send className={`w-3 h-3 ${testingChannel === 'preorder' ? 'animate-pulse' : ''}`} />
                  <span>{testingChannel === 'preorder' ? 'Envoi...' : 'Tester ce canal'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Chat ID ou Groupe Telegram pour les Précommandes :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={preorderChatId}
                    onChange={(e) => setPreorderChatId(e.target.value)}
                    placeholder="Ex: -5365585827 (groupe commande) ou ID privé"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-hidden focus:border-pink-500 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Si vide, utilisera le canal par défaut ({generalChatId || 'groupe commande -5365585827'}).
                </p>
              </div>
            </div>

            {/* CHANNEL 2: PROFORMA */}
            <div className="p-4 rounded-2xl bg-slate-850 border border-amber-500/30 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                    📄
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      2. Factures Proforma (Devis Express 48H)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Reçoit les demandes de facture proforma et devis générés par les clients
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTestChannel('proforma', proformaChatId)}
                  disabled={testingChannel !== null}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Send className={`w-3 h-3 ${testingChannel === 'proforma' ? 'animate-pulse' : ''}`} />
                  <span>{testingChannel === 'proforma' ? 'Envoi...' : 'Tester ce canal'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Chat ID ou Groupe Telegram pour les Factures Proforma :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={proformaChatId}
                    onChange={(e) => setProformaChatId(e.target.value)}
                    placeholder="Ex: -5365585827 ou un groupe / canal dédié Proforma"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-hidden focus:border-amber-500 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Si vide, utilisera le canal par défaut ({generalChatId || 'groupe commande -5365585827'}).
                </p>
              </div>
            </div>

            {/* CHANNEL 3: ACCESS REQUESTS */}
            <div className="p-4 rounded-2xl bg-slate-850 border border-sky-500/30 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-sm">
                    🔑
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      3. Demandes d&apos;Accès Professionnel (Inscription Clients)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Reçoit les demandes de création de compte pro à valider par l&apos;administrateur
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTestChannel('access', accessChatId)}
                  disabled={testingChannel !== null}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Send className={`w-3 h-3 ${testingChannel === 'access' ? 'animate-pulse' : ''}`} />
                  <span>{testingChannel === 'access' ? 'Envoi...' : 'Tester ce canal'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Chat ID ou Groupe Telegram pour les Demandes d&apos;Accès :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={accessChatId}
                    onChange={(e) => setAccessChatId(e.target.value)}
                    placeholder="Ex: 5680755596 (compte admin) ou un groupe dédié Accès Pro"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-hidden focus:border-sky-500 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Si vide, utilisera le canal par défaut ({generalChatId || 'compte admin 5680755596'}).
                </p>
              </div>
            </div>

            {/* CHANNEL FALLBACK / GENERAL */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Canal Général / Repli par défaut
                </label>
                <button
                  type="button"
                  onClick={() => handleTestChannel('general', generalChatId)}
                  disabled={testingChannel !== null}
                  className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-semibold transition cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Tester canal général</span>
                </button>
              </div>
              <input
                type="text"
                value={generalChatId}
                onChange={(e) => setGeneralChatId(e.target.value)}
                placeholder="Ex: -5365585827, 5680755596"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-hidden focus:border-slate-500"
              />
              <p className="text-[10px] text-slate-400">
                Canal universel utilisé si un des canaux ci-dessus est non renseigné. Séparez par des virgules pour diffuser à plusieurs IDs.
              </p>
            </div>
          </div>

          {/* Quick-Assign from Connected Subscribers / Groups */}
          {status?.subscribers && status.subscribers.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  Canaux & Contacts détectés avec le Bot (Attribution en 1 Clic) :
                </div>
                <span className="text-[10px] text-slate-400">
                  {status.subscribers.length} canal/canaux actif(s)
                </span>
              </div>

              <div className="space-y-2">
                {status.subscribers.map((sub) => (
                  <div
                    key={sub.chatId}
                    className="p-3 rounded-xl bg-slate-850 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">{sub.name}</span>
                        {sub.chatType === 'group' || sub.chatType === 'supergroup' ? (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                            Groupe Telegram
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                            Compte Privé
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-sky-400 block mt-0.5">
                        ID: {sub.chatId}
                      </span>
                    </div>

                    {/* Attribution Action Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => assignChatToChannel(sub.chatId, 'preorder')}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                          preorderChatId === sub.chatId
                            ? 'bg-pink-600 text-white border-pink-500'
                            : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border-pink-500/30'
                        }`}
                        title="Assigner aux Précommandes"
                      >
                        🌸 Précommandes
                      </button>

                      <button
                        type="button"
                        onClick={() => assignChatToChannel(sub.chatId, 'proforma')}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                          proformaChatId === sub.chatId
                            ? 'bg-amber-600 text-white border-amber-500'
                            : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                        title="Assigner aux Factures Proforma"
                      >
                        📄 Proforma
                      </button>

                      <button
                        type="button"
                        onClick={() => assignChatToChannel(sub.chatId, 'access')}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                          accessChatId === sub.chatId
                            ? 'bg-sky-600 text-white border-sky-500'
                            : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border-sky-500/30'
                        }`}
                        title="Assigner aux Demandes d'Accès"
                      >
                        🔑 Accès Pro
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collapsible Advanced: Bot Token */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvancedToken(!showAdvancedToken)}
              className="w-full p-3 bg-slate-900/60 hover:bg-slate-900 flex items-center justify-between text-xs font-semibold text-slate-300 transition cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Paramètres Avancés : Token du Bot Telegram
              </span>
              <span className="text-[11px] text-sky-400 font-mono">
                {showAdvancedToken ? 'Masquer' : 'Afficher'}
              </span>
            </button>

            {showAdvancedToken && (
              <div className="p-4 bg-slate-950/80 border-t border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Token Bot HTTP API :
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="8908435035:AAFYIq74hxJeFeiQAPRx_g_WZ7R5fL0uwu8"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                />
                <p className="text-[10px] text-slate-400">
                  Ce token permet au serveur Tulip d&apos;authentifier et poster les messages via @tulip5661bot.
                </p>
              </div>
            )}
          </div>

          {/* Test Feedback Toast / Alert */}
          {testResult && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="flex-1 font-medium">{testResult.message}</div>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Configuration des canaux Telegram enregistrée avec succès !
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 text-center sm:text-left">
            Les changements sont immédiatement appliqués sur le serveur central.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{loading ? 'Enregistrement...' : 'Enregistrer la configuration'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
