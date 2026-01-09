import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, ExternalLink, QrCode } from 'lucide-react';
import logger from '@/utils/logger';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const DEFAULT_APP_URL = import.meta.env.VITE_APP_URL || 'https://example.com';

function QrPoster() {
  const posterRef = useRef(null);
  const [appUrl, setAppUrl] = useState(DEFAULT_APP_URL);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchQrRedirectUrl = async () => {
      try {
        const response = await axios.get('/api/content/qrRedirectUrl');
        setAppUrl(response.data.content || DEFAULT_APP_URL);
      } catch (error) {
        logger.error('Error fetching QR redirect URL:', error);
        setAppUrl(DEFAULT_APP_URL);
      } finally {
        setLoading(false);
      }
    };

    fetchQrRedirectUrl();
  }, []);

  useEffect(() => {
    const generateQr = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(appUrl, {
          width: 640,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff'
          }
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        logger.error('Error generating QR code:', error);
      }
    };

    if (appUrl) {
      generateQr();
    }
  }, [appUrl]);

  const renderCanvas = async () => {
    if (!posterRef.current) {
      return null;
    }

    return html2canvas(posterRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true
    });
  };

  const downloadPng = async () => {
    setDownloading(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'app-qr-poster.png';
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imageData);
      const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      pdf.addImage(imageData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('app-qr-poster.pdf');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <QrCode className="w-7 h-7 text-slate-900" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gradient-accent mb-3">
            Scan the Future
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A premium QR poster that sends people straight to your app — ready to print, share, and display anywhere.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button onClick={downloadPng} disabled={downloading || loading || !qrDataUrl} variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
          <Button onClick={downloadPdf} disabled={downloading || loading || !qrDataUrl} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button asChild variant="glass" size="sm">
            <a href={appUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open App
            </a>
          </Button>
        </div>

        <Card className="border border-white/10 shadow-2xl shadow-cyan-500/10 overflow-hidden">
          <CardContent className="p-0">
            <div
              ref={posterRef}
              className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-8 sm:px-12 py-12 sm:py-14"
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_55%)]" />
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.3),_transparent_55%)]" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <p className="uppercase tracking-[0.3em] text-xs text-emerald-300 font-semibold mb-4">
                    Instant access
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-display font-extrabold leading-tight mb-4">
                    Your next step starts here.
                  </h2>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                    Scan the code to jump into the app experience — no typing, no friction. Perfect for events,
                    meetings, or a quick scan on your phone.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    <span className="font-semibold">Destination:</span>
                    <span className="truncate max-w-[220px] sm:max-w-[280px]">{appUrl}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-emerald-500/20">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR code linking to the app" className="w-60 h-60 sm:w-72 sm:h-72" />
                    ) : (
                      <div className="w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center text-slate-500">
                        {loading ? 'Generating QR...' : 'QR unavailable'}
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-slate-300">Point your camera here and launch the app instantly.</p>
                </div>
              </div>

              <div className="relative z-10 mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
                <span>Print-ready • A4 friendly • High contrast</span>
                <span>Update the destination anytime in Admin → Media → QR Poster Redirect.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default QrPoster;
