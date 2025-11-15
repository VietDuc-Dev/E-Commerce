import { Search, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { toggleAIModal } from "@/store/popup/popupSlice";
import { Input } from "../ui/input";
import { fetchProductWithAI } from "@/store/product/productThunks";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

const SearchWithAi = () => {
  const { isAIPopupOpen } = useSelector((state: RootState) => state.popup);
  const { aiSearching } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const [userPrompt, setUserPrompt] = useState("");

  const exampleText = [
    "Tìm bộ đồ cho nam, tông màu sáng phù hợp với nhân viên văn phòng",
    "Tìm sản phẩm có thể giúp tối làm việc nhà nhanh chóng",
    "Tìm điện thoại màu vàng, có dung lượng lưu trữ cao",
  ];

  const handleClose = () => dispatch(toggleAIModal());

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(fetchProductWithAI(userPrompt));
    if (fetchProductWithAI.fulfilled.match(result)) {
      dispatch(toggleAIModal());
    }
  };

  return (
    <div>
      <Button
        onClick={() => dispatch(toggleAIModal())}
        className="flex items-center gap-2 bg-gradient-to-br from-green-400 to-blue-600 hover:opacity-90 text-white"
      >
        <Sparkles className="size-4" />
        Tìm sản phẩm với AI
      </Button>

      <Dialog open={isAIPopupOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex justify-start items-center space-x-2 space-y-3">
              <div className="bg-gradient-to-br from-green-400 to-blue-600 hover:opacity-90 text-white p-2 rounded">
                <Sparkles className="size-4" />
              </div>
              <span>Tìm kiếm sản phẩm với AI</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground flex justify-center">
              Hãy mô tả chi tiết những gì bạn cần tìm kiếm và AI sẽ hỗ trợ bạn
            </p>
          </DialogHeader>

          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </span>

              <Input
                type="text"
                placeholder="Viết yêu cầu của bạn ở đây ..."
                className="pl-10"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>

            <Button
              disabled={aiSearching || !userPrompt.trim()}
              type="submit"
              className="w-full bg-gradient-to-br from-green-400 to-blue-600 hover:opacity-90 text-white"
            >
              {aiSearching ? (
                <div className="flex items-center space-x-2">
                  <Spinner />
                  <span>Đang tìm sản phẩm ...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Tìm sản phẩm với AI
                </>
              )}
            </Button>
          </form>

          <div>
            <div className="">
              <p className="text-sm mb-3">Ví dụ mẫu:</p>
              <div className="flex flex-wrap gap-2 space-y-2">
                {exampleText.map((example) => (
                  <Button
                    key={example}
                    onClick={() => setUserPrompt(example)}
                    className="bg-gradient-to-br from-green-300 to-blue-400 text-gray-700 ring-4 outline-none ring-green-200"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchWithAi;
