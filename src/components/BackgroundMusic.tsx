"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

const tracks = wedding.music.tracks;

export function BackgroundMusic({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackIndexRef = useRef(0);
  const playingRef = useRef(false);
  const volumeRef = useRef(0.35);
  const mutedRef = useRef(false);
  const operationRef = useRef(0);
  const fadeRef = useRef(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("");

  const fadeTo = useCallback((target: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();
    const fadeId = ++fadeRef.current;
    const startVolume = audio.volume;
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const step = () => {
        if (fadeId !== fadeRef.current) {
          resolve();
          return;
        }
        const progress = Math.min(1, (performance.now() - startTime) / duration);
        audio.volume = startVolume + (target - startVolume) * progress;
        if (progress === 1) resolve();
        else window.setTimeout(step, 24);
      };
      step();
    });
  }, []);

  const startTrack = useCallback(async (index: number, explainMissing = true) => {
    const audio = audioRef.current;
    const track = tracks[index];
    if (!audio || !track) return;
    if (!track.enabled) {
      if (explainMissing) {
        setStatus("ऑडियो फ़ाइलें जोड़ने के बाद संगीत चल सकेगा।");
        setExpanded(true);
      }
      return;
    }

    const operation = ++operationRef.current;
    audio.src = track.src;
    audio.loop = true;
    audio.volume = 0;
    audio.load();
    try {
      await audio.play();
      if (operation !== operationRef.current) return;
      playingRef.current = true;
      setPlaying(true);
      setStatus("");
      await fadeTo(mutedRef.current ? 0 : volumeRef.current, 650);
    } catch (error) {
      if (operation !== operationRef.current) return;
      playingRef.current = false;
      setPlaying(false);
      const blocked = error instanceof Error && error.name === "NotAllowedError";
      setStatus(blocked ? "संगीत शुरू करने के लिए चलाएँ दबाएँ।" : "यह संगीत फ़ाइल उपलब्ध नहीं है।");
      setExpanded(true);
    }
  }, [fadeTo]);

  const switchTrack = useCallback(async (index: number, resume = playingRef.current) => {
    const nextIndex = (index + tracks.length) % tracks.length;
    const audio = audioRef.current;
    const operation = ++operationRef.current;

    if (playingRef.current && audio) {
      playingRef.current = false;
      setPlaying(false);
      await fadeTo(0, 360);
      if (operation !== operationRef.current) return;
      audio.pause();
    }

    trackIndexRef.current = nextIndex;
    setTrackIndex(nextIndex);
    setStatus("");
    const track = tracks[nextIndex];
    if (!track.enabled) {
      if (audio) {
        audio.removeAttribute("src");
        audio.load();
      }
      setStatus("ऑडियो फ़ाइलें जोड़ने के बाद संगीत चल सकेगा।");
      setExpanded(true);
      return;
    }

    if (resume) await startTrack(nextIndex);
  }, [fadeTo, startTrack]);

  const pauseTrack = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !playingRef.current) return;
    const operation = ++operationRef.current;
    playingRef.current = false;
    setPlaying(false);
    await fadeTo(0, 320);
    if (operation !== operationRef.current) return;
    audio.pause();
    audio.volume = mutedRef.current ? 0 : volumeRef.current;
  }, [fadeTo]);

  useEffect(() => {
    const handleEnvelopeOpen = () => {
      void startTrack(0, false);
    };
    window.addEventListener("wedding-envelope-open", handleEnvelopeOpen);
    return () => window.removeEventListener("wedding-envelope-open", handleEnvelopeOpen);
  }, [startTrack]);

  useEffect(() => {
    if (!visible || !("IntersectionObserver" in window)) return;
    const stages = [
      { id: "nimantran", track: 1 },
      { id: "parichay", track: 2 },
      { id: "share", track: 3 },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const stage = stages.find((item) => item.id === entry.target.id);
          if (stage && stage.track !== trackIndexRef.current) {
            void switchTrack(stage.track, playingRef.current);
          }
        }
      },
      { rootMargin: "-25% 0px -45% 0px" },
    );
    stages.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [switchTrack, visible]);

  useEffect(() => () => {
    operationRef.current += 1;
    fadeRef.current += 1;
    audioRef.current?.pause();
  }, []);

  function togglePlayback() {
    if (playingRef.current) void pauseTrack();
    else void startTrack(trackIndexRef.current);
  }

  function changeVolume(value: number) {
    volumeRef.current = value;
    setVolume(value);
    if (!mutedRef.current && audioRef.current) audioRef.current.volume = value;
  }

  function toggleMute() {
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    if (audioRef.current) audioRef.current.volume = nextMuted ? 0 : volumeRef.current;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[0].enabled ? tracks[0].src : undefined}
        className="audio-hidden"
        preload="none"
        loop
        onError={() => {
          playingRef.current = false;
          setPlaying(false);
          setStatus("यह संगीत फ़ाइल उपलब्ध नहीं है।");
        }}
      />
      {visible && (
        <aside className={`music-player${expanded ? " music-player--expanded" : ""}`} aria-label="पृष्ठभूमि संगीत नियंत्रण">
          <div className="music-player-main">
            <button
              className="music-play-button"
              onClick={togglePlayback}
              aria-label={playing ? "संगीत रोकें" : "संगीत चलाएँ"}
              aria-pressed={playing}
            >
              <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
            </button>
            <span className="music-player-track">
              <small>वर्तमान धुन</small>
              <strong>{tracks[trackIndex].title}</strong>
            </span>
            <button
              className="music-expand-button"
              onClick={() => setExpanded((value) => !value)}
              aria-label={expanded ? "संगीत नियंत्रण संक्षिप्त करें" : "संगीत नियंत्रण खोलें"}
              aria-expanded={expanded}
            >
              {expanded ? "−" : "+"}
            </button>
          </div>
          {expanded && (
            <div className="music-player-details">
              <div className="music-track-buttons">
                <button onClick={() => void switchTrack(trackIndexRef.current - 1)} aria-label="पिछली धुन">‹</button>
                <button onClick={() => void switchTrack(trackIndexRef.current + 1)} aria-label="अगली धुन">›</button>
              </div>
              <button className="music-mute-button" onClick={toggleMute} aria-pressed={muted}>
                {muted ? "आवाज़ चालू" : "म्यूट"}
              </button>
              <label className="music-volume">
                <span className="sr-only">संगीत की आवाज़</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => changeVolume(Number(event.target.value))}
                />
              </label>
              {status && <p className="music-status" role="status">{status}</p>}
            </div>
          )}
        </aside>
      )}
    </>
  );
}
