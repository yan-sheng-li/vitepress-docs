# yolo11上手与实践

> 使用 **Medical Pills Dataset** 操作起来非常方便，因为它已经被 Ultralytics 官方直接支持。这意味着你不用手动下载和整理数据，用几行代码就能开始训练。

整个流程主要分三步：准备环境、训练模型、用新图片测试。

## 🔧 第一步：环境准备

首先，在你的电脑上安装好核心的 `ultralytics` 库。你可以用命令行，或者在 Jupyter Notebook / Google Colab 这样的交互式环境里运行。

```bash
pip install ultralytics
```

## 🚀 第二步：训练模型

这是最核心的一步，代码非常精简。你可以选择用 Python 脚本或命令行来启动训练。

**方法一：Python 脚本**

```python
from ultralytics import YOLO

# 1. 加载一个预训练的 YOLO11 模型 (nano版本，轻量快速)
model = YOLO("yolo11n.pt")  

# 2. 开始训练！数据直接指向 "medical-pills.yaml"，Ultralytics会自动处理下载
results = model.train(data="medical-pills.yaml", epochs=100, imgsz=640)
```
**方法二：命令行**

```bash
yolo detect train data=medical-pills.yaml model=yolo11n.pt epochs=100 imgsz=640
```

*   **`data="medical-pills.yaml"`**：这个文件就像数据集的“说明书”，告诉模型去哪里找数据。因为数据集已被支持，所以系统会自动处理。
*   **`epochs=100`**：让模型学习100遍，能有效提升识别能力。
*   训练完成后，最好的模型权重会保存在 `runs/detect/train/weights/best.pt` 里。

## 🧪 第三步：验证与测试

1.  **评估模型**：训练完可以用 `model.val()` 看看模型在验证集上的表现，主要关注 `mAP` (平均精度均值) 这个指标。

2.  **用新图片推理**：用训练好的模型去识别新的药丸图片。
    ```python
    import os
    from ultralytics import YOLO
    
    # 加载训练好的模型权重
    model = YOLO('/content/runs/detect/train/weights/best.pt')
    
    # 构造验证集图片目录的路径
    val_images_dir = '/content/datasets/medical-pills/images/val/'
    
    # 检查目录是否存在
    if not os.path.exists(val_images_dir):
        print(f"错误: 验证集图片目录未找到: {val_images_dir}")
    else:
        # 列出目录中的文件并找到第一个 .jpg 图片
        image_files = [f for f in os.listdir(val_images_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff'))]
        if image_files:
            test_image_path = os.path.join(val_images_dir, image_files[0])
            print(f"使用图片进行预测: {test_image_path}")
            # 对测试图片进行预测
            results = model(test_image_path)
    
            # 展示预测结果
            for r in results:
                r.show()
        else:
            print(f"错误: 在 {val_images_dir} 中未找到任何图片文件 (.jpg, .jpeg, .png, .bmp, .tiff)。")
    ```
