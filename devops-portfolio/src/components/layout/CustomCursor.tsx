"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const animateFollower = () => {
      const { x: fx, y: fy } = followerPosRef.current;
      const { x: tx, y: ty } = posRef.current;
      const newX = fx + (tx - fx) * 0.1;
      const newY = fy + (ty - fy) * 0.1;
      followerPosRef.current = { x: newX, y: newY };
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${newX - 20}px, ${newY - 20}px)`;
      }
      requestAnimationFrame(animateFollower);
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += " scale(0.7)";
      }
      if (followerRef.current) {
        followerRef.current.style.transform += " scale(1.5)";
      }
    };
    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          cursorRef.current.style.transform.replace(" scale(0.7)", "");
      }
    };

    const handleHover = () => {
      if (followerRef.current) {
        followerRef.current.style.width = "60px";
        followerRef.current.style.height = "60px";
        followerRef.current.style.borderColor = "rgba(0,212,255,0.8)";
      }
    };
    const handleUnhover = () => {
      if (followerRef.current) {
        followerRef.current.style.width = "40px";
        followerRef.current.style.height = "40px";
        followerRef.current.style.borderColor = "rgba(0,212,255,0.4)";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], .card-hover"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    const rafId = requestAnimationFrame(animateFollower);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  );
}
