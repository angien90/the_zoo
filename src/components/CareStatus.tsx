export type Status = "happy" | "warning" | "alert";

export interface CareStatusProps {
    animalName: string;
    status: Status;
    type: "feed" | "pet";       
    onAction?: () => void;
    hoursSince?: number;
    buttonLabel?: string;
    canAct?: boolean;
}

export const CareStatus = ({ animalName, status, type, onAction, buttonLabel, canAct }: CareStatusProps) => {
  const messages: Record<Status, string> = {
    happy: type === "feed"
      ? `😃 ${animalName} är mätt och belåten! 😃`
      : `😃 ${animalName} har fått sin kärlek! 😃`,
    
    warning: type === "feed"
      ? `⚠️ ${animalName} blir snart hungrig! ⚠️`
      : `⚠️ ${animalName} börjar bli kelsjuk! ⚠️`,
    
    alert: type === "feed"
      ? `🚨 ${animalName} behöver matas nu! 🚨`
      : `🚨 ${animalName} behöver klappas nu! 🚨`
  };

  return (
    <>
      <p className={status}>{messages[status]}</p>
      {onAction && buttonLabel && (
        <button className="love-button" onClick={onAction} disabled={!canAct}>
          {buttonLabel}
        </button>
      )}
    </>
  );
};