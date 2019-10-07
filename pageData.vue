<template>
	<view class="content">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabArr" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view v-show="TabCur==0">
			<view class="overview">
				<text :class="isTime=='today'?'item active':'item'" @click="tabTime" data-item='today'>今日</text>
				<text :class="isTime=='sevenday'?'item active':'item'" @click="tabTime" data-item='sevenday'>近7日</text>
				<text :class="isTime=='thirtyday'?'item active':'item'" @click="tabTime" data-item='thirtyday'>近30日</text>
			</view>
			<view class="date-selection">
				<picker mode="date" :value="startDate" start="2018-09-01" end="2020-09-01" @change="DateChange" data-id="start">
					<text class="picker">
						{{startDate}}
					</text>
				</picker>
				<picker mode="date" :value="endDate" start="2019-09-01" end="2020-09-01" @change="DateChange" data-id="end">
					<text class="picker">
						{{endDate}}
					</text>
				</picker>
			</view>
		</view>
		<view v-show="TabCur==1">
			1
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabArr:['交易概览','订单','设备排行','商品排行'],
				isTime:'today',
				startDate: '2018-12-25',
				endDate: '2019-12-25'
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tabTime(e) {
				this.isTime = e.currentTarget.dataset.item;
			},
			DateChange(e) {
				console.log(e)
				if(e.currentTarget.dataset.id == 'start'){
					this.startDate = e.detail.value
				}else{
					this.endDate = e.detail.value
				}
				
			},
		}
	}
</script>

<style>
.content{
	background-color: #FFFFFF;
}	
.text-orange{
	color: #F5BC34;
}
.overview{
	padding: 20upx 30upx;
}
.overview .item{
	display: inline-flex;
	min-width: 100upx;
	height: 40upx;
	border: 1px solid rgba(236, 236, 236, 1);
	color: #595656;
	border-radius: 40upx;
	font-size: 24upx;
	justify-content: center;
	align-items: center;
	margin-right: 20upx;
	background-color: #FFFFFF;
}
.overview .item.active{
	background-color: #F5BC34;
	color: #FFFFFF;
	border-color: #F5BC34;
}
</style>
