from django.db import models


class Bus(models.Model):
    class Meta:
        app_label = 'myyl'
    # 인원수
    peopleNumber = models.IntegerField()
    # IN count
    in_count = models.IntegerField()
    # OUT count
    out_count = models.IntegerField()
    # 혼잡도
    congestion = models.CharField(max_length=40)
    # 현재 시간대
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.peopleNumber)

