// 导出
export function download_file(url) {
    if (typeof(download_file.iframe) == "undefined") {
        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
    }
    download_file.iframe.onload = function() {
        let errorHint = download_file.iframe.contentWindow.document.body.innerText;
        vMessage.close(msg.id);
        if ('' != errorHint) {
            // 删除指定弹窗
            vModal.warning({
                title: '导出失败',
                content: errorHint
            });
        }
    }
    download_file.iframe.src = url;
    download_file.iframe.style.display = "none";
    // const msg = vMessage.loading( '正在下载，请稍等...' );
}