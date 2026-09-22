import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { askCampusAI, type AiReply } from "@/lib/aiAssistant";

export function AiAssistantDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<AiReply | null>(null);

  async function send() {
    if (!value.trim() || loading) return;
    setLoading(true);
    setReply(null);
    const res = await askCampusAI(value);
    setReply(res);
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI 校园助手
          </DialogTitle>
          <DialogDescription>
            第一版使用模拟回答，后续将接入真实校园知识库。
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            value={value}
            placeholder="问我任何校园问题，例如：第一节高数在哪里？"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} disabled={loading || !value.trim()}>
            {loading ? "思考中" : "发送"}
          </Button>
        </div>

        {loading && (
          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            AI 正在查询校园数据……
          </div>
        )}

        {reply && !loading && (
          <div className="space-y-3 rounded-xl bg-muted p-4">
            <p className="text-sm leading-relaxed">{reply.text}</p>
            {reply.buildingId && (
              <Button asChild size="sm" variant="secondary" onClick={() => onOpenChange(false)}>
                <Link to="/map" search={{ to: reply.buildingId }}>
                  查看路线
                </Link>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
