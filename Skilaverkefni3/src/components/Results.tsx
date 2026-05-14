interface ResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const Result = ({ score, total, onRestart }: ResultProps) => (
  <div className="score-section">
    Þú fékkst {score} af {total} réttum!
    <button
      onClick={onRestart}
      style={{ marginTop: "20px", justifyContent: "center" }}
    >
      Prófa aftur!
    </button>
  </div>
);
